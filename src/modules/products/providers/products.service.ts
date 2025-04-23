import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CategoriesService } from '../../categories/providers';
import {
  CreateProductDto,
  CreateProductResponseDto,
  UpdateProductDto,
} from '../dto';
import { GetProductResponseDto } from '../dto/get-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(userId: string, createProductDto: CreateProductDto) {
    const categoryId = createProductDto.category;
    const foundCategory = await this.categoriesService.findOneByUserId(
      userId,
      categoryId || '',
    );
    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }
    const product = await this.productsRepository.create(userId, {
      ...createProductDto,
      category: foundCategory._id,
    });
    return plainToInstance(CreateProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(categories: string[]) {
    const categoryObjectIds =
      await this.categoriesService.mapUuidsToObjectIds(categories);
    const products = await this.productsRepository.findAll(categoryObjectIds);
    return plainToInstance(GetProductResponseDto, products, {
      excludeExtraneousValues: true,
    });
  }

  async findAllByUserId(userId: string) {
    const products = await this.productsRepository.findAllByUserId(userId);
    return plainToInstance(GetProductResponseDto, products, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne(id);
    // return plainToInstance(GetProductResponseDto, product, {
    //   excludeExtraneousValues: true,
    // });
    return product;
  }

  async findOneByUserId(userId: string, id: string) {
    const product = await this.productsRepository.findOneByUserId(userId, id);
    return plainToInstance(GetProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async update(userId: string, id: string, updateProductDto: UpdateProductDto) {
    const foundCategory = await this.categoriesService.findOneByUserId(
      userId,
      updateProductDto.category || '',
    );
    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }
    const updatedProduct = await this.productsRepository.update(userId, id, {
      ...updateProductDto,
      category: foundCategory._id,
    });
    return plainToInstance(CreateProductResponseDto, updatedProduct);
  }

  remove(userId: string, id: string) {
    return this.productsRepository.delete(userId, id);
  }
}
