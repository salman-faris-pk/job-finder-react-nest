import { IsString, IsNumber, IsOptional, Min, MaxLength, MinLength } from "class-validator";

export class CreateJobDto {
    @IsString()
    @MinLength(5, { message: "Job title must be at least 5  characters long" })
    @MaxLength(50, { message: "Job title must not exceed3 30 characters" })
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
    @MinLength(25, { message: "description must be at least 25  characters long" })
    @MaxLength(500, { message: "Description must not exceed 500 characters" })
    desc: string;

    @IsString()
    @MinLength(15, { message: "requirements must be at least 15  characters long" })
    @MaxLength(500, { message: "Requirements must not exceed 500 characters" })
    requirements: string;
}