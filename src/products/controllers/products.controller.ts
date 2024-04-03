import { ProductsService } from '@/products/services/products.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import {
  CreateProductDTO,
  UpdateProductDTO,
} from '@/products/dtos/products.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() product: CreateProductDTO) {
    return this.productsService.create(product)
  }

  @ApiQuery({
    name: 'limit',
    required: false,
    schema: { type: 'number', default: 100, minimum: 1, maximum: 200 },
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    schema: { type: 'number', default: 0, minimum: 0 },
  })
  @Get()
  getAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 100,
    @Query('offset', new ParseIntPipe({ optional: true })) offset = 0,
  ) {
    console.log(limit, offset)
    return this.productsService.findAll()
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDTO,
  ) {
    return this.productsService.update(id, product)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.productsService.delete(id)
  }
}
