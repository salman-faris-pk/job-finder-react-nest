import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[PrismaModule,CompaniesModule,CloudinaryModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
