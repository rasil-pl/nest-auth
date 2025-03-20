import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';

import { CreateProjectDto, UpdateProjectDto } from '../dtos';
import { Project } from '../entities';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async create(
    userId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    try {
      return await this.projectModel.create({
        ...createProjectDto,
        userId,
      });
    } catch (err) {
      if (err instanceof mongo.MongoServerError && err.code === 11000) {
        throw new ConflictException('Project with this name already exists');
      }
      throw err;
    }
  }

  async findAllByUserId(userId: string): Promise<Project[]> {
    return await this.projectModel.find({ userId }).exec();
  }

  async findOne(filter: Partial<Project>): Promise<Project | null> {
    return await this.projectModel.findOne(filter).exec();
  }

  async update(
    userId: string,
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project | null> {
    return await this.projectModel
      .findOneAndUpdate(
        {
          userId,
          uuid: projectId,
        },
        updateProjectDto,
        { new: true, runValidators: true },
      )
      .exec();
  }

  async delete(projectId: string): Promise<boolean> {
    const result = await this.projectModel
      .deleteOne({ uuid: projectId })
      .exec();
    return result.deletedCount > 0;
  }
}
