import { IsString, IsEmail, MinLength, Length} from "class-validator"



export class RegisterInputs {

    @IsString()
    firstName: string;
    
    @IsString()
    lastName: string;

    
    @IsEmail({}, { message: "Please provide a valid email" })
    email:string;

    @IsString()
    @MinLength(6, { message: "Password length should be greater than 6 characters" })
    password:string;
}