import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { GetCategoryQueryDto } from '../dto/get-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.create({
      ...createCategoryDto,
      createdBy: userId,
    });
  }

  async findAll(getCategoryQueryDto: GetCategoryQueryDto) {
    const { limit, page } = getCategoryQueryDto;
    const skip = (page - 1) * limit;
    const categoriesPromise = this.categoryModel
      .find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();
    const categoriesCountPromise = this.categoryModel
      .find()
      .countDocuments()
      .exec();
    const [categories, total] = await Promise.all([
      categoriesPromise,
      categoriesCountPromise,
    ]);
    const totalPages = Math.ceil(total / limit);
    const meta = { page, limit, total, totalPages };
    return { categories, meta };
  }

  async findAllByUserId(
    userId: string,
    getCategoryQueryDto: GetCategoryQueryDto,
  ) {
    const { limit, page } = getCategoryQueryDto;
    const skip = (page - 1) * limit;
    const categoriesPromise = this.categoryModel
      .find({ createdBy: userId })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();
    const categoriesCountPromise = this.categoryModel
      .find()
      .countDocuments()
      .exec();
    const [categories, total] = await Promise.all([
      categoriesPromise,
      categoriesCountPromise,
    ]);
    const totalPages = Math.ceil(total / limit);
    const meta = { page, limit, total, totalPages };
    return { categories, meta };
  }

  async findOneById(id: string) {
    return await this.categoryModel.findOne({ uuid: id }).exec();
  }

  async findOneByUserId(userId: string, id: string) {
    return await this.categoryModel
      .findOne({ uuid: id, createdBy: userId })
      .exec();
  }

  async findOneByName(userId: string, name: string) {
    return await this.categoryModel.findOne({ name, createdBy: userId }).exec();
  }

  async update(
    userId: string,
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryModel
      .findOneAndUpdate({ uuid: id, createdBy: userId }, updateCategoryDto, {
        new: true,
      })
      .exec();
  }

  async delete(userId: string, id: string) {
    return await this.categoryModel
      .findOneAndDelete({ uuid: id, createdBy: userId })
      .exec();
  }

  async mapUuidsToObjectIds(uuids: string[]) {
    const matchedCategories = await this.categoryModel
      .find({
        uuid: { $in: uuids },
      })
      .select('_id');
    return matchedCategories.map((cat) => cat._id);
  }
}
