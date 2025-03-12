import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class JobsService {

    constructor(
      private readonly prisma:PrismaService,
      private readonly Companyservice:CompaniesService,
    ){}

  async CreateNewJob(compId:string,jobPostDto:CreateJobDto){

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
            companyId:compId,
            detail: {
                create: {
                    desc,
                    requirements
                }
            },
        },
        include : {
            detail: true
        }
    });

    await this.Companyservice.updateCompanyJobs(compId, Job.id);
   
     
    
   return {
    success: true,
    message: "Job Posted SUccessfully",
    Job
   };
  
  };




  };




