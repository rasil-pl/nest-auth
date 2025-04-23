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
  CreateProductDto,
  CreateProductResponseDto,
  UpdateProductDto,
} from './dto';
import { DeleteProductResponseDto } from './dto/delete-product.dto';
import {
  GetProductResponseDto,
  GetProductsQueryDto,
} from './dto/get-product.dto';
import { ProductsService } from './providers';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product' })
  @ApiCreatedResponse({
    description: 'Created product successfully',
    type: CreateProductResponseDto,
  })
  @Post()
  create(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(currentUser.id, createProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({
    description: 'Products fetched successfully',
    type: GetProductResponseDto,
    isArray: true,
  })
  @Get('all')
  findAll(@Query() getProductsQueryDto: GetProductsQueryDto) {
    const categories = getProductsQueryDto.categories;
    const categoriesArray = categories?.split(',') || [];
    return this.productsService.findAll(categoriesArray);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products created by user' })
  @ApiOkResponse({
    description: 'Products fetched successfully',
    type: GetProductResponseDto,
    isArray: true,
  })
  @Get()
  findAllByUserId(@CurrentUser() currentUser: RequestCurrentUser) {
    return this.productsService.findAllByUserId(currentUser.id);
  }

  @ApiOperation({ summary: 'Get a product by id' })
  @ApiOkResponse({
    description: 'Product fetched successfully',
    type: GetProductResponseDto,
  })
  @Get('all/:id')
  findOneById(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a product created by user' })
  @ApiOkResponse({
    description: 'Product fetched successfully',
    type: GetProductResponseDto,
  })
  @Get(':id')
  findOne(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('id') id: string,
  ) {
    return this.productsService.findOneByUserId(currentUser.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Product by id' })
  @ApiOkResponse({
    description: 'Product updated successfully',
    type: CreateProductResponseDto,
  })
  @Patch(':id')
  update(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(currentUser.id, id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product' })
  @ApiOkResponse({
    description: 'Product deleted successfully',
    type: DeleteProductResponseDto,
  })
  @Delete(':id')
  remove(
    @CurrentUser() currentUser: RequestCurrentUser,
    @Param('id') id: string,
  ) {
    return this.productsService.remove(currentUser.id, id);
  }
}
