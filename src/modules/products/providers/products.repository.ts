import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';

import { Category } from '../../categories/entities/category.entity';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(userId: string, createProductDto: CreateProductDto) {
    return await this.productModel.create({
      ...createProductDto,
      createdBy: userId,
    });
  }

  async findAll(categories: mongoose.Types.ObjectId[]) {
    const filter: FilterQuery<Product> =
      categories.length > 0
        ? {
            category: { $in: categories },
          }
        : {};

    return await this.productModel
      .find(filter)
      .populate('category', null, Category.name)
      .exec();
  }

  async findAllByUserId(userId: string) {
    return await this.productModel
      .find({ createdBy: userId })
      .populate('category', null, Category.name)
      .exec();
  }

  async findOne(id: string) {
    return await this.productModel
      .findOne({ uuid: id })
      .populate('category', null, Category.name)
      .exec();
  }

  async findOneByUserId(userId: string, id: string) {
    return await this.productModel
      .findOne({ createdBy: userId, uuid: id })
      .populate('category', null, Category.name)
      .exec();
  }

  async update(userId: string, id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel
      .findOneAndUpdate({ uuid: id, createdBy: userId }, updateProductDto, {
        new: true,
      })
      .exec();
  }

  async delete(userId: string, id: string) {
    return await this.productModel
      .findOneAndDelete({ uuid: id, createdBy: userId })
      .exec();
  }
}
