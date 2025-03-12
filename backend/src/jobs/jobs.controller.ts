import { Body, Controller, Get, Param,Post,Put,Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIdRequest } from 'src/auth/types/auth-jwtPayload';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}


  @Post('upload-job')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async CreateJob(@Body() createJob:CreateJobDto,@Req() req:UserIdRequest){

     return this.jobsService.CreateNewJob(req.user.id,createJob)

  }

  @Put('upload-job/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async updateJob(@Param('id') id:string,@Body() updateJobDto: UpdateJobDto){

    return this.jobsService.UpdateJobById(id,updateJobDto)
  }


  // @Get('find-jobs')
  // async GetJobPosts(){
  //    return this.jobsService.getPostedJobs()
  // }




}
