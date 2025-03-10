import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginInputs } from '../dto/login.inputs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  validate(email: string, password: string) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new UnauthorizedException('Please provide a valid email address');
    }
    if (password.length < 6 || password.length > 10) {
        throw new UnauthorizedException('Password must be between 6 and 10 characters long');
    }

    const user = this.authService.validateUser(email,password);
    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    return user;
}
}