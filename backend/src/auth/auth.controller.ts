import { Controller, Post,Body,ValidationPipe, UsePipes, UseInterceptors} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInputs } from './dto/register.inputs';
import { LoginInputs } from './dto/login.inputs';
import { CompanyRegisterDto } from "./dto/company.register"
import { SetCookieInterceptor } from "./interceptors/set-cookie.interceptor"


@Controller('auth')
@UseInterceptors(SetCookieInterceptor)
export class AuthController {

  constructor(private readonly authService: AuthService) {}

@Post('register')
@UsePipes(new ValidationPipe())
async SignUpUser(@Body() registerDto: RegisterInputs) {
    return this.authService.registerUser(registerDto);
}

@Post('login')
@UsePipes(new ValidationPipe())
async SignInUser(@Body() loginDto: LoginInputs) {
    return this.authService.LoginUser(loginDto);
}


@Post('company-register')
@UsePipes(new ValidationPipe())
async CompanyRegistration(@Body() compRegisDTO:CompanyRegisterDto){
  return this.authService.CompanyUserRegistration(compRegisDTO);

}

@Post('company-login')
@UsePipes(new ValidationPipe())
async CompanySignin(@Body() compLoginDTO:LoginInputs){
  return this.authService.CompanySignIn(compLoginDTO);

}




}
