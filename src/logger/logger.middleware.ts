import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      const { statusCode } = res;
      if (statusCode === 200 || statusCode === 201) {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} - ${responseTime}ms`,
        );
      }
    });

    next();
  }
}
