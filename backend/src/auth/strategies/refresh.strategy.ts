import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { AuthJwtpayload } from '../types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy,'refresh-jwt') {
  
    constructor(
    @Inject(refreshJwtConfig.KEY)
    refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authService: AuthService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (request: Request) => {
              return request?.cookies?.refreshToken;
            },
          ]),
      secretOrKey: refreshJwtConfiguration.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

 validate(request: Request, payload: AuthJwtpayload) {
    const refreshToken = request.cookies?.refreshToken;
    const userId=payload.sub;
    return this.authService.validateRefreshToken(userId,refreshToken);
  }

}