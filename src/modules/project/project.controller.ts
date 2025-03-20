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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { CurrentUser, Roles } from '../../common/decorators';
import {
  BadRequestErrorDto,
  ConflictErrorDto,
  UnauthorizedErrorDto,
} from '../../common/dtos/errors.dto';
import { RequestCurrentUser } from '../../types';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Role } from '../users/enums';
import { CreateProjectDto, UpdateProjectDto } from './dtos';
import { ProjectDto } from './dtos/project.dto';
import { ProjectService } from './providers';

@ApiBearerAuth()
@ApiExtraModels(
  ProjectDto,
  UnauthorizedErrorDto,
  BadRequestErrorDto,
  ConflictErrorDto,
)
@Roles(Role.USER, Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create project' })
  @ApiOkResponse({
    description: 'Project created successfully',
    schema: { $ref: getSchemaPath(ProjectDto) },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    schema: { $ref: getSchemaPath(UnauthorizedErrorDto) },
  })
  @ApiConflictResponse({
    description: 'Conflict',
    schema: { $ref: getSchemaPath(ConflictErrorDto) },
  })
  @ApiBadRequestResponse({
    description: 'BadRequest',
    schema: { $ref: getSchemaPath(BadRequestErrorDto) },
  })
  create(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(currentUser.id, createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects of current user' })
  @ApiOkResponse({
    description: 'Projects fetched successfully',
    schema: { $ref: getSchemaPath(ProjectDto) },
    type: ProjectDto,
    isArray: true,
  })
  findAll(@CurrentUser() currentUser: RequestCurrentUser) {
    return this.projectService.findAllByUserId(currentUser.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiOkResponse({
    description: 'Project fetched successfully',
    schema: { $ref: getSchemaPath(ProjectDto) },
  })
  findOne(@Param('id') id: string) {
    return this.projectService.findOneById(id);
  }

  @Patch(':projectId')
  @ApiOperation({ summary: 'Update project by id' })
  @ApiOkResponse({
    description: 'Project updated successfully',
    schema: { $ref: getSchemaPath(ProjectDto) },
  })
  update(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(
      currentUser.id,
      projectId,
      updateProjectDto,
    );
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete project by id' })
  @ApiNoContentResponse({ description: 'Project deleted successfully' })
  remove(@Param('projectId') projectId: string) {
    return this.projectService.remove(projectId);
  }
}
