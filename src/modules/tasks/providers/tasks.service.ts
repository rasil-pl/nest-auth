import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProjectService } from 'src/modules/project/providers';

import { CreateTaskDto, TaskQueryDto, UpdateTaskDto } from '../dtos';
import { TaskDto, TasksDto } from '../dtos/task.dto';
import { Task } from '../entities';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly projectService: ProjectService,
  ) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const { projectId } = createTaskDto;
    const project = await this.projectService.findOneById(projectId);
    if (!project) {
      throw new NotFoundException("Project doesn't exist");
    }
    const newTask = await this.tasksRepository.create(userId, createTaskDto);
    return plainToInstance(TaskDto, newTask);
  }

  async getAllByUserId(userId: string, taskQueryDto: TaskQueryDto) {
    const { data, page, limit, total } =
      await this.tasksRepository.findAllByUserId(userId, taskQueryDto);
    const meta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
    return plainToInstance(TasksDto, { data, meta });
  }

  async getOneByTaskId(userId: string, taskId: string): Promise<Task | null> {
    const task = await this.tasksRepository.findOneByTaskId(userId, taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return plainToInstance(TaskDto, task);
  }

  async updateByTaskId(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const updatedTask = await this.tasksRepository.updateByTaskId(
      userId,
      taskId,
      updateTaskDto,
    );
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return plainToInstance(TaskDto, updatedTask);
  }

  async deleteByTaskId(userId: string, taskId: string): Promise<void> {
    const hasDeleted = await this.tasksRepository.deleteByTaskId(
      userId,
      taskId,
    );
    if (!hasDeleted) {
      throw new NotFoundException('Task not found');
    }
  }
}
