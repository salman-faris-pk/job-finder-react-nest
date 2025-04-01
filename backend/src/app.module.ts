import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { CompaniesModule } from './companies/companies.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CronService } from "./cron.service"

@Module({
  imports: [
    PrismaModule, AuthModule, UsersModule, JobsModule, CompaniesModule, CloudinaryModule],
  controllers: [],
  providers: [CronService],
})

export class AppModule {}
