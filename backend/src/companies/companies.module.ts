import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[PrismaModule,CloudinaryModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports:[CompaniesService]
})
export class CompaniesModule {}
