import { BadRequestException,Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { UpdateJobDto } from './dtos/update.dto';

@Injectable()
export class JobsService {

    constructor(
      private readonly prisma:PrismaService,
      private readonly Companyservice:CompaniesService,
    ){}

  async CreateNewJob(companyId:string,jobPostDto:CreateJobDto){

    const {jobTitle,jobType,location,salary,vacancies,experience,desc,requirements}=jobPostDto;

    if (!jobTitle || !jobType || !location || !salary || !requirements || !desc) {
       throw new BadRequestException("Please Provide All Required Fields");
    };

   
    const Job=await this.prisma.job.create({
        data:{
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
              connect: {id: companyId}
            }
        },
    });
    
    
    await this.Companyservice.updateCompanyJobs(companyId, Job.id);
    
   
   return {
    success: true,
    message: "Job Posted SUccessfully",
    Job
   };
  
  };


  async UpdateJobById(jobId:string,updateJobDto:UpdateJobDto){
      
      const {  jobTitle, jobType,location,salary,vacancies,experience,desc,requirements}=updateJobDto;
      const updatedDetail = {
        desc: desc || "", 
        requirements: requirements || "",
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
      message: "Job Post Updated SUccessfully",
      jobPost,
      }

    };






  };




