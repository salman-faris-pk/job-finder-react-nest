import { Inject, Injectable,UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport"
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service"
import { AuthJwtpayload } from "../types/auth-jwtPayload";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
       @Inject(jwtConfig.KEY)
       jwtConfiguration: ConfigType<typeof jwtConfig>,
       private readonly authService: AuthService,
    ){
     
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConfiguration.secret,
        ignoreExpiration: false,
      });
    }

    validate(payload: AuthJwtpayload) {
      const userId = payload.sub;
      try {
          const user = this.authService.validateJwtUser(userId);
          if (!user) {
              throw new UnauthorizedException('Invalid token');
          }
          return user;
      } catch (error) {
          throw new UnauthorizedException('Invalid or expired token');
      }
  }


};