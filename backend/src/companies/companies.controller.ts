import { Body, Controller, NotFoundException, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIdRequest } from 'src/auth/types/auth-jwtPayload';
import { CompanyJobListBodyDto, CompanyJobListQueryDto } from './dto/company.query.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}


  @Post('company-profile')
  @UseGuards(JwtAuthGuard)
  async GetCompanyProfile(@Req() req:UserIdRequest){
    return this.companiesService.getCompanyProfile(req.user.id)
  }

  @Post('company-joblist')
  @UseGuards(JwtAuthGuard)
  async CompnayJobLists(@Query() query: CompanyJobListQueryDto,@Body() body: CompanyJobListBodyDto){

    const {userId}=body.user;
    if (!userId) {
      throw new NotFoundException('User ID is required');
    };

    return this.companiesService.getCompanyJobslist(query,userId)
  };
  

}
