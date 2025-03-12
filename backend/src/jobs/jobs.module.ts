import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports:[PrismaModule,CompaniesModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
