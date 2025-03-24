import { IsOptional, IsString, IsEmail} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString({ message: "Profile URL must be a string" })
  profileUrl?: string;
  
  @IsOptional()
  @IsString()
  portfolioUrl?:string;
  
  @IsOptional()
  @IsString()
  githubUrl?:string;

  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  about?: string;


  
}
