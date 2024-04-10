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
import { JwtGuard } from '@/auth/decorators/jwt-guard.decorator'
import { Roles } from '@/auth/decorators/roles.decorator'
import { Role } from '@/auth/models/roles.model'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { Public } from '@/auth/decorators/public.decorator'

@ApiTags('products')
@JwtGuard(RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() product: CreateProductDTO) {
    return this.productsService.create(product)
  }

  @Public()
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

  @Roles(Role.ADMIN)
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
