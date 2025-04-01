import { Injectable, NestMiddleware } from '@nestjs/common';
import { CronService } from './cron.service';
import { Request, Response } from 'express';

@Injectable()
export class ActivityMiddleware implements NestMiddleware {
  constructor(private readonly cronService: CronService) {}

  use(req: Request, res: Response, next: () => void) {
    this.cronService.userActivityDetected();
    next();
  }
}
