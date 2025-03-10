import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') || '',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || '',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') || '',
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }


  async validate(accessToken: string,profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
  
    if (!emails || emails.length === 0) {
      return done(new Error('No email found'), false);
    }
  
    console.log({ profile });
  
    done(null);
  }
  
}