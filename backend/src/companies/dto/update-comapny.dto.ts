import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CompanyUpdateDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "Location is required" })
  location: string;

  @IsString()
  @IsNotEmpty({ message: "About is required" })
  about: string;

  @IsString()
  @IsNotEmpty({ message: "Contact is required" })
  contact: string;

  @IsOptional()
  @IsString({ message: "Profile URL must be a string" })
  profileUrl?: string;
}
