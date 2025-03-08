import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from "express"
import * as cookieParser from "cookie-parser"
import { AllExceptionsFilter } from "./filters/allexceptions.filter"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json({ limit: '10mb' }));
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter())
  
  await app.listen(process.env.PORT ?? 8003);
}
bootstrap();
 