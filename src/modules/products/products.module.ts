import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesModule } from '../categories/categories.module';
import { Product, ProductEntity } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsRepository, ProductsService } from './providers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductEntity }]),
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
