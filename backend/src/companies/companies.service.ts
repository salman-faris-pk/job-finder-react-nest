import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompaniesService {

    constructor(
          private readonly prisma:PrismaService,
    ){}


   async FindById(compId:string,){
      return await this.prisma.companies.findUnique({
      where:{id: compId}
     });
   };

   async updateCompanyJobs(compId: string, jobId: string) {
    
    return await this.prisma.companies.update({
      where: { id: compId },
      data: {
        jobPosts: {
          connect: { id: jobId }, 
      },
    }
    });
  }
  

}
