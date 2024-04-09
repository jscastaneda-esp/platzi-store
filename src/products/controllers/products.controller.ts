import { ProductsService } from '@/products/services/products.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import {
  CreateProductDTO,
  FilterProductDTO,
  UpdateProductDTO,
} from '@/products/dtos/products.dto'
import { ApiTags } from '@nestjs/swagger'
import { ParseMongoIdPipe } from '@/common/parse-mongo-id.pipe'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() product: CreateProductDTO) {
    return this.productsService.create(product)
  }

  @Get()
  getAll(@Query() query: FilterProductDTO) {
    return this.productsService.findAll(query)
  }

  @Get(':id')
  getById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productsService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() product: UpdateProductDTO,
  ) {
    return this.productsService.update(id, product)
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    this.productsService.remove(id)
  }
}
