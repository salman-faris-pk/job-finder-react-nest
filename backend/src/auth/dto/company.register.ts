import { IsString, IsEmail, MinLength,Length} from "class-validator"




export class CompanyRegisterDto {

    @IsString()
    @Length(5, 20, { message: "comapny name must be between 5 and 20 characters" })
    name:string;
    
    @IsEmail({}, { message: "Please provide a valid email" })
    email:string;

    @IsString()
    @MinLength(6, { message: "Password length should be greater than 6 characters" })
    password:string;
}