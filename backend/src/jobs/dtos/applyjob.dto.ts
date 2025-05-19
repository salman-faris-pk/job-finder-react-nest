import { IsNotEmpty, IsString, IsUrl, IsOptional, IsUUID } from 'class-validator';

export class ApplyJobDto {

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  JobId: string;

  @IsNotEmpty()
  @IsString()
  CvUrl: string;

  @IsString()
  @IsOptional()
  whyHire?: string;

  
}
