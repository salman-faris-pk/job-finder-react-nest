import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {

        if (data.accessToken) {
          response.cookie('accessToken', data.accessToken, {
            httpOnly: true,
            secure: true, 
            sameSite: "none", 
            maxAge: 900000, 
          });

          delete data.accessToken; 
        };

        if (data.refreshToken) {
          response.cookie('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite:"none",
            maxAge: 172800000, 
          });

          delete data.refreshToken;  // Remove refreshtoken from the response data after stored into cookie
        }

        if (data.clearCookies) {
          response.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
          });
          response.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
          });
        }
      
        return data;
      }),
    );
  }
}
