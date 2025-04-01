import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('dummy')
  dummyRoute() {
    return { message: 'Hello, world! Cron job triggered.' };
  }
}
