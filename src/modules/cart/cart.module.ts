import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsModule } from '../products/products.module';
import { CartController } from './cart.controller';
import { Cart, CartEntity } from './entities/cart.entity';
import { CartItem, CartItemEntity } from './entities/cart-item.entity';
import { CartRepository } from './providers/cart.repository';
import { CartService } from './providers/cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartEntity },
      { name: CartItem.name, schema: CartItemEntity },
    ]),
    ProductsModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}
