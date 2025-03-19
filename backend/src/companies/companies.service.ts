import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyJobQueryDto } from './dto/company.query.dto';
import { CompanyUpdateDto } from './dto/update-comapny.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async FindById(compId: string) {
    return await this.prisma.companies.findUnique({
      where: { id: compId },
      include: { jobPosts: true },
      omit:{
        password: true,
        hashedRefreshToken:true,
      }
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

    const {jobPosts: _,...companyDatas} = company;

    return {
      success: true,
      data: companyDatas,
      jobPostCount: companyJobPostCount,
    };
  };


  async getCompanyJobslist(query: CompanyJobQueryDto,compId: string) {
    
    const { search, sort} = query;

    const queryObject: any = {};

    if (search) {
      queryObject.location = { contains: search, mode: 'insensitive'};
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
     omit: {
      password: true,
      hashedRefreshToken:true
     }
   });

   if (!company) {
    throw new NotFoundException('Company not found');
  }

     return {
      success: true,
      companies: company,
     }

  };


  async getCompanies(query:CompanyJobQueryDto){

     const {location,search,sort,limit,page}=query;

     const pageNum = Number(page) || 1;
     const limitNum = Number(limit) || 10;

     const queryObject:any = {};

     if (search) {
      queryObject.name = { contains: search, mode: 'insensitive'};
    };

    if(location){
      queryObject.location = {contains: location, mode: 'insensitive'}
    };

    let orderBy :any = undefined;;
    if (sort === "Newest") orderBy = { createdAt: "desc" };
    if (sort === "Oldest") orderBy = { createdAt: "asc" };
    if (sort === "A-Z") orderBy = { name: "asc" };
    if (sort === "Z-A") orderBy = { name: "desc" };

    
    const total = await this.prisma.companies.count({ where: queryObject });    
    
    const companies=await this.prisma.companies.findMany({
      where: queryObject,
      orderBy,
      take: limitNum * pageNum,
      select: {
        id: true,
        name: true,
        email: true,
        contact:true,
        location: true,
        about: true,
        profileUrl: true,
      },
    });

    return {
      success: true,
      total,
      companydata: companies,
      page: pageNum,
      numOfPage: Math.ceil(total / limitNum),
    };

  };



  async getSingleCompany(id:string){
    
    const company = await this.prisma.companies.findUnique({
      where: { id }, 
      include: {
        jobPosts: {
          orderBy: {
            id: 'desc',
          },
        },
      },
      omit:{
        password:true,
        hashedRefreshToken:true
      }
    });
    
    if (!company) {
      throw new NotFoundException({ message: "Company Not Found", success: false });
    };

    return {
      success: true,
      data: company,
    }

  };


  async editCompanyProfile(compId:string,updatesData:CompanyUpdateDto){

    const Company=await this.prisma.companies.findUnique({
      where:{id : compId}
    });
    if (!Company) {
      throw new NotFoundException(`No user found with id: ${compId}`);
    };

    const company=await this.prisma.companies.update({
      where:{id: compId},
      data:updatesData,
      omit:{
        password:true,
        hashedRefreshToken:true
      }
    });

    return {
      success: true,
      message: "Company Profile Updated SUccessfully",
      company,
    }

  };





}
