import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';
import { LoggerMiddleware } from './logger';
import { AuthModule } from './modules/auth/auth.module';
import { AuthzModule } from './modules/authz/authz.module';
import { ProjectModule } from './modules/project/project.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.db.connectionString),
    UsersModule,
    AuthModule,
    TasksModule,
    ProjectModule,
    AuthzModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
