import { Body, Controller, Delete, Get, Param,Post,Put,Query,Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIdRequest } from 'src/auth/types/auth-jwtPayload';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update.dto';
import { JobQueryDto } from './dtos/job-query.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}


  @Post('upload-job')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async CreateJob(@Body() createJob:CreateJobDto,@Req() req:UserIdRequest){
    console.log(req.user.id);


     return this.jobsService.CreateNewJob(req.user.id,createJob)

  }

  @Put('upload-job/:id')
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

  @Delete('delete-job/:id')
  @UseGuards(JwtAuthGuard)
  async DeleteJob(@Param('id') id:string){
    return this.jobsService.DeleteJobById(id)
   
  }



}
