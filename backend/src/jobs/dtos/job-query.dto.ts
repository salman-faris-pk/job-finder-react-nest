import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class JobQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  jtype?: string;

  @IsOptional()
  @IsString()
  exp?: string;

  @IsOptional()
  @Type(() => Number) 
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number) 
  @IsInt()
  @Min(1)
  limit?: number;
}
