import { IsString, IsEmail, MinLength} from "class-validator"


export class LoginInputs {

     @IsEmail({}, { message: "Please provide a valid email" })
     email:string;
    
     @IsString()
     @MinLength(6, { message: "Password length should be greater than 6 characters" })
     password:string;
}