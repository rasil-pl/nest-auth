import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger('HTTP');
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    this.logger.error(
      `${request.method} ${request.originalUrl} ${status} - error: ${exception.message}`,
    );
    const errorDetails = exception.getResponse();
    response.status(status).json(errorDetails);
  }
}
