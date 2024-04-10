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
import { ParseMongoIdPipe } from '@/common/parse-mongo-id.pipe'
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
  getAll(@Query() query: FilterProductDTO) {
    return this.productsService.findAll(query)
  }

  @Get(':id')
  getById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productsService.findOne(id)
  }

  @Roles(Role.ADMIN)
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
