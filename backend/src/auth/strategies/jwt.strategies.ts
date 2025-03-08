import { Injectable,UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport"
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from "../auth.service"
import { AuthJwtpayload } from "../types/auth-jwtPayload";
import { Request } from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
       private readonly authService: AuthService,
       configService: ConfigService,
    ){
     
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
              (request: Request) => request?.cookies?.accessToken || null
            ]),
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret_key', //to verify the token’s signature.
            ignoreExpiration: false,   //Ensures that expired JWT tokens are not accepted.
            passReqToCallback: true,
          });

    }

    async validate(payload: AuthJwtpayload) {
        const userId = payload.sub;
        const user = await this.authService.validateJwtUser(userId);
        if (!user) {
          throw new UnauthorizedException('Invalid token');
        }
        return user;  // The returned user will be attached to `req.user`
      }


};