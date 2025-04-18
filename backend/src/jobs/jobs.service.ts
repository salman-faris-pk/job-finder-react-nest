import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { UpdateJobDto } from './dtos/update.dto';
import { JobQueryDto } from './dtos/job-query.dto';
import { ApplyJobDto } from './dtos/applyjob.dto';
import { DeleteAppliacntDTO, UpdateJobStatusDTO } from './dtos/update.status.dto';

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly Companyservice: CompaniesService,
  ) {}

  async CreateNewJob(jobPostDto: CreateJobDto,companyId: string) {
    
    const { jobTitle,jobType,location,salary,vacancies,experience,desc, requirements } = jobPostDto;

    if (
      !jobTitle || !jobType || !location || !salary || !requirements || !desc || !experience) {
      throw new BadRequestException('Please Provide All Required Fields');
    }

    const Job = await this.prisma.job.create({
      data: {
        jobTitle,
        jobType,
        location,
        salary,
        vacancies,
        experience,
        detail: [
          {
            desc,
            requirements,
          },
        ],
        company: {
          connect: { id: companyId },
        },
      },
    });

    await this.Companyservice.updateCompanyJobs(companyId, Job.id);

    return {
      success: true,
      message: 'Job Posted SUccessfully',
      Job,
    };
  };



  async UpdateJobById(jobId: string, updateJobDto: UpdateJobDto) {

    const {jobTitle,jobType,location,salary,vacancies,experience,desc,requirements,} = updateJobDto;
    
    const updatedDetail = {
      desc: desc || '',
      requirements: requirements || '',
    };

    const jobPost = await this.prisma.job.update({
      where: { id: jobId },
      data: {
        jobTitle,
        jobType,
        location,
        salary,
        vacancies,
        experience,
        detail: {
          set: [updatedDetail],
        },
      },
    });

    return {
      success: true,
      message: 'Job Post Updated SUccessfully',
      jobPost,
    };

  };



  async getPostedJobs(queryDatas: JobQueryDto) {
    const { search, exp, jtype, location, sort, limit, page } = queryDatas;
    const types = jtype?.split(','); //splits like this full-time,part-time

    let queryObject: any = {};

    if (location) {
      queryObject.location = { contains: location, mode: 'insensitive' };
    }

    if (jtype) {
      queryObject.jobType = { in: types };
    }

    if (exp) {
      const expFilters = exp.split(',');
      const expConditions = expFilters.map((expFilter) => {
        if (expFilter.includes('-')) {
          const [minExp, maxExp] = expFilter.split('-').map(Number);
          return {
            experience: {
              gte: minExp, 
              lte: maxExp,
            },
          };
        } else {
          const expValue = Number(expFilter);
          return {
            experience: {
              gte: expValue,
            },
          };
        }
      });
  
      queryObject.OR = expConditions;
    };


    if (search) {
      queryObject.OR = [
        { jobTitle: { contains: search, mode: 'insensitive' } },
        { jobType: { contains: search, mode: 'insensitive' } },
      ];
    }

    const AllqueryResult = await this.QuerySortAndPagination(queryObject,sort,page,limit);
       
    const {totalJobs,jobs,Page,numOfPage}=AllqueryResult;

    return{
      success: true,
      totalJobs,
      data: jobs,
      Page,
      numOfPage,
    }
  };

 
  async QuerySortAndPagination(queryObject: any, sort: string | undefined, page: number | undefined, limit: number | undefined) {
    
    const Page = Number(page) || 1;
    const Limit = Number(limit) || 12;
    const skip = (Page - 1) * Limit;
  
    const totalJobs = await this.prisma.job.count({
      where: queryObject,
    });
  
    const queryResults = this.prisma.job.findMany({
      where: queryObject,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            email: true,
            contact: true,
            location: true,
            about: true,
            profileUrl: true,
          },
        },
      },
      orderBy:
        sort === 'Newest'
          ? { createdAt: 'desc' }
          : sort === 'Oldest'
            ? { createdAt: 'asc' }
            : sort === 'A-Z'
              ? { jobTitle: 'asc' }
              : sort === 'Z-A'
                ? { jobTitle: 'desc' }
                : undefined,
      skip: skip,
      take: Limit,
    });
  
    const numOfPage = Math.ceil(totalJobs / Limit);
  
    const jobs = await queryResults;
   
    return {
      totalJobs,
      jobs,
      Page,
      numOfPage,
    };
  };



  async getJobDetailById(jobId:string){
      
    const job=await this.prisma.job.findUnique({
      where:{id: jobId},
      include: {
        company: {
          select: {
            id: true,
            name: true,
            email: true,
            contact: true,
            location: true,
            about: true,
            profileUrl: true,
          },
        },
        _count: {
          select: { application: true}
        }
      },
    });

    if (!job) {
      throw new NotFoundException('Job Post Not Found');
    };

    const similarJobs = await this.prisma.job.findMany({
      where: {
        OR: [
          { jobTitle: { contains: job.jobTitle, mode: 'insensitive' } },
          { jobType: { contains: job.jobType, mode: 'insensitive' } },
        ],
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            email: true,
            contact: true,
            location: true,
            about: true,
            profileUrl: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
      take: 6, 
    });


    return {
      success: true,
      data: job,
      applicationCount: job._count.application,
      similarJobs,
    };

  };
  


  async DeleteJobById(jobId:string){
   
    return await this.prisma.$transaction(async (tx) => {

      const job = await tx.job.findUnique({
        where: { id: jobId },
        select: { companyId: true },
      });
  
      if (!job) {
        throw new NotFoundException("Job not found.");
      }

      await tx.job.delete({
        where: { id: jobId },
      });

      await tx.companies.update({
         where: { id: job.companyId},
         data: {
          jobPosts: {
            set: (await tx.companies.findUnique({
               where:{ id: job.companyId},
               select: {jobPosts: true},
            }))?.jobPosts.filter((post) => post.id !== jobId) || []
          }
         }
      });

      return {
        success: true,
        message: "Job Post Deleted Successfully.",
      };

    });

};


async JobApplying(applyJob: ApplyJobDto){

  const {CvUrl,JobId,userId,whyHire}=applyJob;

  const existingApplication = await this.prisma.jobApplication.findFirst({
    where: {
      jobId: JobId,
      userId: userId,
    },
  });

  if (existingApplication) {
    return {
      success: false,
      message: 'You have already applied for this job',
    };
  }

   await this.prisma.jobApplication.create({
    data:{
      jobId:JobId,
      CvUrl,
      userId,
      whyHire
    },
   });

   return {
    success: true,
     message: 'job apllied succesfully'
   };
};


async JobApplicants(JobId:string){

  const JobApplicants=await  this.prisma.jobApplication.findMany({
    where:{ jobId: JobId},
    select:{
      applicationStatus: true,
      appliedAt: true,
      CvUrl: true,
      user:{
        select:{
          id: true,
          location: true,
          profileUrl: true,
          firstName: true,
        }
      }
    },
    orderBy: {
      appliedAt: "desc"
    }
  });
  
  const flattenedApplications = JobApplicants.map(app => ({
    ...app.user, 
    applicationStatus: app.applicationStatus,
    appliedAt: app.appliedAt,
    CvUrl: app.CvUrl
  }));

  return {
    success: true,
    Applications: flattenedApplications,
    count: flattenedApplications.length,
  };

};


async updateApplicationStatus(updateStatus:UpdateJobStatusDTO){
  
   const {jobId,userId,newStatus}=updateStatus;

   const updatedStatus= await this.prisma.jobApplication.updateMany({
    where:{
      jobId: jobId,
      userId: userId,
    },
    data: {
      applicationStatus: newStatus
    }
   });

   if (updatedStatus.count === 0) {
    return {
      success: false,
      message: "No application found to update"
    };
   }

   return {
    success: true,
    message: "Status updated successfully"
  };
};


async deleteJobApplicationByCompany(dleteDto:DeleteAppliacntDTO){
  const { jobId,userId }=dleteDto;

  const deleted= await this.prisma.jobApplication.deleteMany({
    where:{
      jobId: jobId,
      userId: userId,
    }
  });

  if (deleted.count === 0) {
    return {
      success: false,
      message: "No application found to delete"
    };
  }

  return {
    success: true,
    message: "Application deleted successfully",
  };

};

}