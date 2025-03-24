import { Controller, Post,Body,ValidationPipe, UsePipes, UseInterceptors, UseGuards, Res, Get, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInputs } from './dto/register.inputs';
import { LoginInputs } from './dto/login.inputs';
import { CompanyRegisterDto } from "./dto/company.register"
import { SetCookieInterceptor } from "./interceptors/set-cookie.interceptor"
import { ThrottlerGuard } from "@nestjs/throttler"
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
@UseGuards(LocalAuthGuard) 
async SignInUser(@Req() req: AuthenticatedRequest) {
    return this.authService.LoginUser(req.user);
}

@Post('refresh')
@UseGuards(RefreshAuthGuard)   //first checks is refreshtoken valid or not! if valid then get a userid from this guard,if refresh token is not valid then shows error,we can set navigate to login page in froentend
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

  
@Get('google/login')
@UseGuards(GoogleAuthGuard)
async googleLogin() {
  //its automaticaly redirects to googles email selection page
}

@Get('google/callback')
@UseGuards(GoogleAuthGuard)
async googleCallback(@Req() req:AuthenticatedRequest) {
  const loginResult=await  this.authService.LoginUser(req.user); 

  return {
    ...loginResult,
    redirectUrl: process.env.FRONTEND_URL,
  };
};


@Post('logout')
@UseGuards(JwtAuthGuard)
async SignOutUser(@Req() req:UserIdRequest){
   return this.authService.Logoutuser(req.user.id);
};

};
 