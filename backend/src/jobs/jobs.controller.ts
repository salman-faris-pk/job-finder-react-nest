import { Body, Controller, Delete, Get, Param,Post,Put,Query,Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIdRequest } from 'src/auth/types/auth-jwtPayload';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update.dto';
import { JobQueryDto } from './dtos/job-query.dto';
import { ApplyJobDto } from './dtos/applyjob.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CvUploadInterceptor } from './interceptor/jobupload.interceptor';
import { memoryStorage } from 'multer';
import { Request } from 'express';

@Controller('jobs')  
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}


  @Post('upload-job') 
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async CreateJob(@Body() createJob:CreateJobDto,@Req() req:UserIdRequest){
     return this.jobsService.CreateNewJob(createJob,req.user.id,)

  }

  @Put('update-job/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async updateJob(@Param('id') id:string,@Body() updateJobDto: UpdateJobDto){
    return this.jobsService.UpdateJobById(id,updateJobDto)
  }


  @Get('find-jobs')
  async GetJobPosts(@Query() query:JobQueryDto){
     return this.jobsService.getPostedJobs(query) 
  }

  @Get('job-detail/:id')
  async GetJobDetail(@Param('id') id:string){    
     return this.jobsService.getJobDetailById(id)
  }

  @Post('job-apply')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("CvUrl", { storage: memoryStorage() }),
   CvUploadInterceptor
  )
  @UsePipes(new ValidationPipe())
  async ApplyJob(@Req() req: Request,@Body() applyJob: ApplyJobDto,@UploadedFile() file: Express.Multer.File) {

    if (file && req.body.CvUrl) {
      applyJob.CvUrl = req.body.CvUrl;
    };

    return this.jobsService.JobApplying(applyJob)
  }

  @Delete('delete-job/:id')
  @UseGuards(JwtAuthGuard)
  async DeleteJob(@Param('id') id:string){
    return this.jobsService.DeleteJobById(id)
  }


  @Get('job-applicants/:id')
  @UseGuards(JwtAuthGuard)
  async JobApplicants(@Param('id') id:string) {
    return this.jobsService.JobApplicants(id)
  }

  
}
