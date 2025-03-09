import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from "./strategies/jwt.strategies"
import { SetCookieInterceptor } from "./interceptors/set-cookie.interceptor"
import { ThrottlerModule } from "@nestjs/throttler"
import { PassportModule } from "@nestjs/passport"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"


@Module({
  imports:[
   ConfigModule,
   PassportModule.register({defaultStrategy: 'jwt'}),
   JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async(configService:ConfigService) => ({
      secret:configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPRIES_IN'),
      }
    })
   }),

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
  providers: [AuthService,PrismaService,JwtStrategy,SetCookieInterceptor,JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class AuthModule {}
