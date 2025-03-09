import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ThrottlerException } from '@nestjs/throttler';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let message = 'Something went wrong!';
    let success = 'failed';


    if (exception instanceof ThrottlerException) {
      statusCode = 429;
      message = 'Rate limit exceeded. Please try again later.';
    }

    else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (typeof errorResponse === 'object' && 'message' in errorResponse) {
        message = (errorResponse as any).message;
      }
    }

    else if (exception.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(exception.errors)
        .map((el: any) => el.message)
        .join(',');
    }

    else if (exception.code && exception.code === 11000) {
      statusCode = 400;
      message = `${Object.values(exception.keyValue)} field has to be unique!`;
    }

    response.status(statusCode).json({
      success,
      message,
    });
  }
}