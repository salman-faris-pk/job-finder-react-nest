import { IsString, IsEmail, MinLength,Length, IsUrl, IsOptional} from "class-validator"

export class RegisterInputs {

    @IsString()
    @Length(3, 15, { message: "First name must be between 3 and 15 characters" })
    firstName: string;
    
    @IsString()
    @Length(2, 12, { message: "Last name must be between 2 and 10 characters" })
    lastName: string;

    @IsString()
    @IsEmail({}, { message: "Please provide a valid email" })
    email:string;

    @IsString()
    @MinLength(6, { message: "Password length should be greater than 6 characters" })
    password:string;

    @IsString()
    @IsUrl()
    @IsOptional()
    profileUrl?:string;
}