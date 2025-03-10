import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule} from '@nestjs/config';
import { JwtStrategy } from "./strategies/jwt.strategies"
import { SetCookieInterceptor } from "./interceptors/set-cookie.interceptor"
import { ThrottlerModule } from "@nestjs/throttler"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"
import { GoogleStrategy } from "./strategies/google.strategy"
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';



@Module({
  imports:[
   JwtModule.registerAsync(jwtConfig.asProvider()),
   ConfigModule.forFeature(jwtConfig),
   ConfigModule.forFeature(refreshJwtConfig),
   ThrottlerModule.forRoot({
    throttlers: [
      {
        ttl: 60000, 
        limit: 5, 
      },
    ],
   }),
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaService,JwtStrategy,SetCookieInterceptor,JwtAuthGuard,GoogleStrategy,LocalStrategy,RefreshJwtStrategy]
})
export class AuthModule {}
