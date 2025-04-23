import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import {
  CreateCategoryDto,
  CreateCategoryResponseDto,
} from '../dto/create-category.dto';
import { DeleteCategoryResponseDto } from '../dto/delete-category.dto';
import {
  GetCategoriesResponseDto,
  GetCategoryQueryDto,
  GetCategoryResponseDto,
} from '../dto/get-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.findOneByName(
      userId,
      createCategoryDto.name,
    );
    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }
    const category = await this.categoriesRepository.create(
      userId,
      createCategoryDto,
    );
    return plainToInstance(CreateCategoryResponseDto, category);
  }

  async findAll(getCategoryQueryDto: GetCategoryQueryDto) {
    const data = await this.categoriesRepository.findAll(getCategoryQueryDto);
    return plainToInstance(GetCategoriesResponseDto, data);
  }

  async findAllByUserId(
    userId: string,
    getCategoryQueryDto: GetCategoryQueryDto,
  ) {
    const data = await this.categoriesRepository.findAllByUserId(
      userId,
      getCategoryQueryDto,
    );
    return plainToInstance(GetCategoriesResponseDto, data);
  }

  async findOneById(id: string) {
    const category = await this.categoriesRepository.findOneById(id);
    return plainToInstance(GetCategoryResponseDto, category);
  }

  async findOneByUserId(userId: string, id: string) {
    const category = await this.categoriesRepository.findOneByUserId(
      userId,
      id,
    );
    return plainToInstance(GetCategoryResponseDto, category);
  }

  findOneByName(userId: string, name: string) {
    return this.categoriesRepository.findOneByName(userId, name);
  }

  async update(
    userId: string,
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const existingCategory = await this.findOneByName(
      userId,
      updateCategoryDto.name || '',
    );
    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }
    const updatedCategory = await this.categoriesRepository.update(
      userId,
      id,
      updateCategoryDto,
    );
    return plainToInstance(CreateCategoryResponseDto, updatedCategory);
  }

  async remove(userId: string, id: string) {
    const deletedCategory = await this.categoriesRepository.delete(userId, id);
    return plainToInstance(DeleteCategoryResponseDto, deletedCategory);
  }

  async mapUuidsToObjectIds(uuids: string[]) {
    return await this.categoriesRepository.mapUuidsToObjectIds(uuids);
  }
}
