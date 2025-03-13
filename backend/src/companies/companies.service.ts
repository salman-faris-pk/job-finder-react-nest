import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyJobListQueryDto } from './dto/company.query.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async FindById(compId: string) {
    return await this.prisma.companies.findUnique({
      where: { id: compId },
      include: { jobPosts: true },
    });
  }

  async updateCompanyJobs(compId: string, jobId: string) {
    return await this.prisma.companies.update({
      where: { id: compId },
      data: {
        jobPosts: {
          connect: { id: jobId },
        },
      },
    });
  }

  async getCompanyProfile(compId: string) {
    const company = await this.FindById(compId);
    if (!company) {
      throw new NotFoundException('Company Not Found');
    }
    const companyJobPostCount = company.jobPosts?.length || 0;

    if (!company) {
      throw new NotFoundException('Company Not Found');
    }

    const {password: pass_,hashedRefreshToken: hashed_,jobPosts: _,...companyDatas} = company;

    return {
      success: true,
      data: companyDatas,
      jobPostCount: companyJobPostCount,
    };
  };


  async getCompanyJobslist(query: CompanyJobListQueryDto,compId: string) {
    
    const { search, sort} = query;

    const queryObject: any = {};

    if (search) {
      queryObject.location = queryObject.location = { contains: search, mode: 'insensitive'};
    };

    let sorting: { [key: string]: 'asc' | 'desc' } = {};

    if (sort === 'Newest') {
      sorting = { createdAt: 'desc' };
    } else if (sort === 'Oldest') {
      sorting = { createdAt: 'asc' };
    } else if (sort === 'A-Z') {
      sorting = { name: 'asc' };
    } else if (sort === 'Z-A') {
      sorting = { name: 'desc' };
    };

   const company=await this.prisma.companies.findUnique({
     where:{ id: compId},
     include:{
      jobPosts: {
        orderBy: sorting,
      }
     },
   });
   
   if (!company) {
    throw new NotFoundException('Company not found');
  }

   const {password: pass_,hashedRefreshToken: hashed_,...companyDatas} = company;


     return {
      success: true,
      companies: companyDatas,
     }

  };











}
