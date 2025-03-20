import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateProjectDto, UpdateProjectDto } from '../dtos';
import { ProjectDto } from '../dtos/project.dto';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const newProject = await this.projectRepository.create(
      userId,
      createProjectDto,
    );
    return plainToInstance(ProjectDto, newProject);
  }

  async findAllByUserId(userId: string) {
    const projects = await this.projectRepository.findAllByUserId(userId);
    return plainToInstance(ProjectDto, projects);
  }

  async findOneById(id: string): Promise<ProjectDto | null> {
    const project = await this.projectRepository.findOne({ uuid: id });
    return plainToInstance(ProjectDto, project);
  }

  async update(
    userId: string,
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ) {
    const updatedProject = await this.projectRepository.update(
      userId,
      projectId,
      updateProjectDto,
    );
    if (!updatedProject) {
      throw new NotFoundException('Project not found.');
    }
    return plainToInstance(ProjectDto, updatedProject);
  }

  async remove(projectId: string) {
    const hasDeleted = await this.projectRepository.delete(projectId);
    if (!hasDeleted) {
      throw new NotFoundException('Project not found');
    }
  }
}
