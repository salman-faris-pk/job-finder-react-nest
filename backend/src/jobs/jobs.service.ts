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

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly Companyservice: CompaniesService,
  ) {}

  async CreateNewJob(companyId: string, jobPostDto: CreateJobDto) {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    } = jobPostDto;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !requirements ||
      !desc
    ) {
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
  }

  async UpdateJobById(jobId: string, updateJobDto: UpdateJobDto) {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    } = updateJobDto;
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
      const experience = exp.includes('-')
      ? exp.split('-').map(Number)
      : [Number(exp), Number(exp)]; 
      
      if (experience.length === 2) {
        queryObject.experience = {
          gte: experience[0] - 1, // If exp = "2-6", then gte = 2 - 1 = 1 (allows 1 year and above)
          lte: experience[1] + 1, // If exp = "2-6", then lte = 6 + 1 = 7 (allows up to 7 years)
        };
      }
    }

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
    const Limit = Number(limit) || 10;
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
  }





}
