import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as cron from 'node-cron';
import axios from 'axios';

@Injectable()
export class CronService implements OnModuleInit {
  private readonly logger = new Logger(CronService.name);
  private task: cron.ScheduledTask;

  onModuleInit() {
    this.task = cron.schedule('*/14 * * * *', async () => {
      try {
        const res = await axios.get('https://job-finder-romk.onrender.com/dummy');
        if (res.status === 200) {
          this.logger.log('GET request sent successfully');
        } else {
          this.logger.warn(`GET request failed with status: ${res.status}`);
        }
      } catch (error) {
        this.logger.error('Error sending request:', error.message);
      }
    });

    process.on('SIGTERM', () => {
      this.task.stop();
      this.logger.log('Cron job stopped (SIGTERM)');
      process.exit(0);
    });

    this.logger.log('Cron job scheduled to run every 14 minutes');
  }
}