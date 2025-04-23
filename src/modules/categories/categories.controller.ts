import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators';
import { RequestCurrentUser } from '../../types';
import { JwtAuthGuard } from '../auth/guards';
import {
  CreateCategoryDto,
  CreateCategoryResponseDto,
} from './dto/create-category.dto';
import { DeleteCategoryResponseDto } from './dto/delete-category.dto';
import {
  GetCategoryQueryDto,
  GetCategoryResponseDto,
} from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './providers';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create category' })
  @ApiCreatedResponse({
    description: 'Category created successfully',
    type: CreateCategoryResponseDto,
  })
  @Post()
  create(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(currentUser.id, createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({
    description: 'Categories fetched successfully',
    isArray: true,
    type: GetCategoryResponseDto,
  })
  @Get('/all')
  findAll(@Query() getCategoryQueryDto: GetCategoryQueryDto) {
    return this.categoriesService.findAll(getCategoryQueryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all categories by user id' })
  @ApiOkResponse({
    description: 'Categories fetched successfully',
    isArray: true,
    type: GetCategoryResponseDto,
  })
  @Get()
  findAllByUserId(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Query() getCategoryQueryDto: GetCategoryQueryDto,
  ) {
    return this.categoriesService.findAllByUserId(
      currentUser.id,
      getCategoryQueryDto,
    );
  }

  @ApiOperation({ summary: 'Get a category by id' })
  @ApiOkResponse({
    description: 'Category fetched successfully',
    type: GetCategoryResponseDto,
  })
  @Get('all/:id')
  findOneById(@Param('id') id: string) {
    return this.categoriesService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a category created by user' })
  @ApiOkResponse({
    description: 'Category fetched successfully',
    type: GetCategoryResponseDto,
  })
  @Get(':id')
  findOneByUserId(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('id') id: string,
  ) {
    return this.categoriesService.findOneByUserId(currentUser.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update category by id' })
  @ApiOkResponse({
    description: 'Category updated successfully',
    type: CreateCategoryResponseDto,
  })
  @Patch(':id')
  update(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(currentUser.id, id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a category' })
  @ApiOkResponse({
    description: 'Category deleted successfully',
    type: DeleteCategoryResponseDto,
  })
  @Delete(':id')
  remove(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('id') id: string,
  ) {
    return this.categoriesService.remove(currentUser.id, id);
  }
}
