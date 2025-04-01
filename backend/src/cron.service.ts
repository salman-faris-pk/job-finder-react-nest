// import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

// @Injectable()
// export class CronService implements OnModuleInit {
//   private readonly logger = new Logger(CronService.name);

//   onModuleInit() {
//     setInterval(() => {
//       this.logger.debug('Task running every 14 minutes');
//     }, 14 * 60 * 1000); 
//   }
// }

import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class CronService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CronService.name);
  private inactivityTimeout: NodeJS.Timeout | null = null;
  private cronInterval: NodeJS.Timeout | null = null;
  private INACTIVITY_PERIOD = 5 * 60 * 1000; 
  private CRON_INTERVAL = 14 * 60 * 1000; 

  onModuleInit() {
    this.logger.debug('CronService initialized. Waiting for inactivity...');
  }

  onModuleDestroy() {
    this.clearCron();
  }

  userActivityDetected() {
    this.logger.debug('User activity detected. Stopping inactivity timer.');

    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }

    this.clearCron();

    this.inactivityTimeout = setTimeout(() => {
      this.startCron();
    }, this.INACTIVITY_PERIOD);
  }

  private startCron() {
    this.logger.debug('App is inactive. Starting cron job every 14 minutes.');

    this.cronInterval = setInterval(() => {
      this.logger.debug('Task running every 14 minutes (due to inactivity)');
    }, this.CRON_INTERVAL);
  }

  private clearCron() {
    if (this.cronInterval) {
      clearInterval(this.cronInterval);
      this.logger.debug('Cron job stopped due to user activity.');
    }
  }
}
