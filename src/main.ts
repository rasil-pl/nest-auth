import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';
import { config } from './config';
import { HttpExceptionFilter } from './exception-filters';
import { instance } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
      level: 'warn',
    }),
  });

  const docConfig = new DocumentBuilder()
    .setTitle('Nest Auth')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
      disableErrorMessages: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      // excludeExtraneousValues: true,
      // excludePrefixes: ['_'],
    }),
  );

  app.use(cookieParser());
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    origin: true,
  });
  await app.listen(config.app.port);
}
bootstrap().catch((e) => console.error('Error bootstrapping application: ', e));
