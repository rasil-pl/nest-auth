import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectModule } from '../project/project.module';
import { Task, TaskEntity } from './entities';
import { TasksRepository, TasksService } from './providers';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskEntity }]),
    ProjectModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
