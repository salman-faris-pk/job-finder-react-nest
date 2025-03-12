import { IsString, IsNumber, MaxLength, Min, IsOptional } from 'class-validator';

export class UpdateJobDto {
    @IsOptional()
    @IsString()
    @MaxLength(100, { message: "Job title must not exceed 100 characters" })
    jobTitle?: string;

    @IsOptional()
    @IsString()
    jobType?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: "Salary must be a positive number" })
    salary?: number;

    @IsOptional()
    @IsNumber()
    @Min(1, { message: "Vacancies must be at least 1" })
    vacancies?: number;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: "Experience must be a positive number" })
    experience?: number;

    @IsOptional()
    @IsString()
    @MaxLength(500, { message: "Description must not exceed 500 characters" })
    desc?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000, { message: "Requirements must not exceed 1000 characters" })
    requirements?: string;
}
