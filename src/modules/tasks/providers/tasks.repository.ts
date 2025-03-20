import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, RootFilterQuery } from 'mongoose';

import { SortDirection } from '../../../common/enums';
import { CreateTaskDto, TaskQueryDto, UpdateTaskDto } from '../dtos';
import { TaskDto } from '../dtos/task.dto';
import { Task } from '../entities';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskModel.create({
      ...createTaskDto,
      userId,
    });
  }

  async findAllByUserId(userId: string, taskQueryDto: TaskQueryDto) {
    const {
      page,
      limit,
      projectId,
      status,
      priority,
      startDate,
      endDate,
      sortBy,
      sortDirection,
    } = taskQueryDto;

    const filter: RootFilterQuery<Task> = {
      userId,
    };

    if (projectId) filter.projectId = projectId;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (startDate && endDate)
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    if (startDate) filter.createdAt = { $gte: new Date(startDate) };
    if (endDate) filter.createdAt = { $lte: new Date(endDate) };

    const sort = {};
    if (sortBy && sortDirection) {
      sort[sortBy] = sortDirection === SortDirection.ASC ? 1 : -1;
    }

    const data = await this.taskModel
      .find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const total = await this.taskModel.countDocuments(filter);

    return { data: plainToInstance(TaskDto, data), page, limit, total };
  }

  async findOneByTaskId(userId: string, taskId: string): Promise<Task | null> {
    return this.taskModel.findOne({
      userId,
      uuid: taskId,
    });
  }

  async updateByTaskId(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    return this.taskModel
      .findOneAndUpdate({ userId, uuid: taskId }, updateTaskDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async deleteByTaskId(userId: string, taskId: string): Promise<boolean> {
    const result = await this.taskModel
      .deleteOne({ userId, uuid: taskId })
      .exec();
    return result.deletedCount > 0;
  }

  async deleteAll() {
    return this.taskModel.deleteMany();
  }
}
