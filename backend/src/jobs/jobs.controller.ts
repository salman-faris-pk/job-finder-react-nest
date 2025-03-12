import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIdRequest } from 'src/auth/types/auth-jwtPayload';
import { CreateJobDto } from './dtos/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}


  @Post('job-post')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async CreateJob(@Body() createJob:CreateJobDto,@Req() req:UserIdRequest){

     return this.jobsService.CreateNewJob(req.user.id,createJob)

  }

}
