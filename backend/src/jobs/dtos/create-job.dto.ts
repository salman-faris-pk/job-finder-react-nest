import { IsString, IsNumber, IsOptional, Min, MaxLength } from "class-validator";

export class CreateJobDto {
    @IsString()
    @MaxLength(100, { message: "Job title must not exceed 100 characters" })
    jobTitle: string;

    @IsString()
    jobType: string;

    @IsString()
    location: string;

    @IsNumber()
    @Min(0, { message: "Salary must be a positive number" })
    salary: number;

    @IsOptional()
    @IsNumber()
    @Min(1, { message: "Vacancies must be at least 1" })
    vacancies?: number;

    @IsNumber()
    @Min(0, { message: "Experience must be a positive number" })
    experience: number;

    @IsString()
    @MaxLength(500, { message: "Description must not exceed 500 characters" })
    desc: string;

    @IsString()
    @MaxLength(1000, { message: "Requirements must not exceed 1000 characters" })
    requirements: string;
}