import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron('*/14 * * * *')
  handleTask() {
    
  }
}