import { IsString, IsNotEmpty } from "class-validator";

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

  @IsNotEmpty({ message: "Profile URL is required" })
  profileUrl: string;
}
