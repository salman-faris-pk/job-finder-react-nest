import { Controller, Post,Body,ValidationPipe, UsePipes, UseInterceptors, UseGuards, Res, Get, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInputs } from './dto/register.inputs';
import { LoginInputs } from './dto/login.inputs';
import { CompanyRegisterDto } from "./dto/company.register"
import { SetCookieInterceptor } from "./interceptors/set-cookie.interceptor"
import { ThrottlerGuard } from "@nestjs/throttler"
import { Response } from 'express';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthenticatedRequest, UserIdRequest} from './types/auth-jwtPayload';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';


@Controller('auth')
@UseInterceptors(SetCookieInterceptor)
export class AuthController {

  constructor(private readonly authService: AuthService) {}

@Post('register')
@UseGuards(ThrottlerGuard)
@UsePipes(new ValidationPipe())
async SignUpUser(@Body() registerDto: RegisterInputs) {
    return this.authService.registerUser(registerDto);
}

@Post('login')
@UsePipes(new ValidationPipe())
@UseGuards(LocalAuthGuard) 
async SignInUser(@Req() req: AuthenticatedRequest) {
    return this.authService.LoginUser(req.user);
}

@Post('refresh')
@UseGuards(RefreshAuthGuard)
refreshToken(@Req() req:UserIdRequest) {
  return this.authService.refreshingToken(req.user.id);
}



@Post('company-register')
@UseGuards(ThrottlerGuard)
@UsePipes(new ValidationPipe())
async CompanyRegistration(@Body() compRegisDTO:CompanyRegisterDto){
  return this.authService.CompanyUserRegistration(compRegisDTO);

}

@Post('company-login')
@UseGuards(ThrottlerGuard)
@UsePipes(new ValidationPipe())
async CompanySignin(@Body() compLoginDTO:LoginInputs){
  return this.authService.CompanySignIn(compLoginDTO);
}


@Post('logout')
@UseGuards(JwtAuthGuard)
async LogoutUser(){
   return this.authService.Logoutuser();
};

@Get('/try')
async justTry(@Res() res:Response) {

  return res.send("<a href='http://localhost:8003/auth/google'>Login with Googel</a>")
  
}

@Get('google')
@UseGuards(GoogleAuthGuard)
async googleAuth() {
  //its automaticaly redirects to googles email selection page
}

@Get('google/callback')
@UseGuards(GoogleAuthGuard)
async googleAuthRedirect(@Req() req:AuthenticatedRequest) {

  // return this.authService.GoogleAuthentication()
  
}



};
