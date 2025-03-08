import { Controller, Post,Body,Res, ValidationPipe, UsePipes} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterInputs } from './dto/register.inputs';
import { LoginInputs } from './dto/login.inputs';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('register')
@UsePipes(new ValidationPipe())
async SignUpUser(@Body() registerDto: RegisterInputs, @Res() res: Response) {
    return this.authService.registerUser(registerDto, res);
}

@Post('login')
@UsePipes(new ValidationPipe())
async SignInUser(@Body() loginDto: LoginInputs, @Res() res: Response) {
    return this.authService.LoginUser(loginDto, res);
}






}
