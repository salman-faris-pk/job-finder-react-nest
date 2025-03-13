import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIdRequest } from 'src/auth/types/auth-jwtPayload';
import { CompanyJobListBodyDto, CompanyJobQueryDto } from './dto/company.query.dto';
import { CompanyUpdateDto } from './dto/update-comapny.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryInterceptor } from 'src/users/interceptor/cloudinary.interceptor';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}



  @Get('')
  async GetCompaies(@Query() query:CompanyJobQueryDto){
    return this.companiesService.getCompanies(query)
  }


  @Get(':id')
  async GetCompanyById(@Param('id') id:string){
    return this.companiesService.getSingleCompany(id)
  }


  @Post('company-profile')
  @UseGuards(JwtAuthGuard)
  async GetCompanyProfile(@Req() req:UserIdRequest){
    return this.companiesService.getCompanyProfile(req.user.id)
  }


  @Post('company-joblist')
  @UseGuards(JwtAuthGuard)
  async CompnayJobLists(@Query() query: CompanyJobQueryDto,@Body() body: CompanyJobListBodyDto){

    const {userId}=body.user;
    if (!userId) {
      throw new NotFoundException('User ID is required');
    };

    return this.companiesService.getCompanyJobslist(query,userId)
  };


  @Put("update-company")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
    @UseInterceptors(
      FileInterceptor("profileUrl", { storage: memoryStorage() }),
      CloudinaryInterceptor
    )
  async UpdateCompanyProfile(@Req() req:UserIdRequest,@Body() updatesData:CompanyUpdateDto,@UploadedFile() file: Express.Multer.File){

    if (file && req.body.profileUrl) {
      updatesData.profileUrl = req.body.profileUrl;
    };

    return this.companiesService.editCompanyProfile(req.user.id,updatesData)

  }



  

}
