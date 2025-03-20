import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  getSchemaPath,
} from '@nestjs/swagger';

import { CurrentUser, Roles } from '../../common/decorators';
import { RequestCurrentUser } from '../../types';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Role } from '../users/enums';
import { CreateTaskDto, TaskQueryDto, UpdateTaskDto } from './dtos';
import { TaskDto, TasksDto } from './dtos/task.dto';
import { TasksService } from './providers';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiExtraModels(TasksDto)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiCreatedResponse({
    description: 'Task created successfully',
    schema: { $ref: getSchemaPath(TaskDto) },
  })
  async createTask(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(currentUser.id, createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks of current user' })
  @ApiOkResponse({
    description: 'Tasks fetched successfully',
    schema: { $ref: getSchemaPath(TasksDto) },
  })
  async getAllUserTasks(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Query() taskQueryDto: TaskQueryDto,
  ) {
    return this.tasksService.getAllByUserId(currentUser.id, taskQueryDto);
  }

  @Get(':taskId')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ summary: 'Get task by id' })
  @ApiOkResponse({
    description: 'Task fetched successfully',
    schema: { $ref: getSchemaPath(TaskDto) },
  })
  async getUserTaskByTaskId(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.getOneByTaskId(currentUser.id, taskId);
  }

  @Patch(':taskId')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ summary: 'Update task by id' })
  @ApiOkResponse({
    description: 'Task updated successfully',
    schema: { $ref: getSchemaPath(TaskDto) },
  })
  async updateTask(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.updateByTaskId(
      currentUser.id,
      taskId,
      updateTaskDto,
    );
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ summary: 'Delete task by id' })
  @ApiNoContentResponse({ description: 'Task deleted successfully' })
  async deleteTask(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('taskId') taskId: string,
  ) {
    await this.tasksService.deleteByTaskId(currentUser.id, taskId);
  }
}
