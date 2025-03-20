import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Project, ProjectEntity } from './entities';
import { ProjectController } from './project.controller';
import { ProjectRepository, ProjectService } from './providers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectEntity }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
