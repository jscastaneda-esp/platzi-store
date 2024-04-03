import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common'

import { BrandsService } from '../services/brands.service'
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brands.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('products', 'brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  findAll() {
    return this.brandsService.findAll()
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id)
  }

  @Post()
  create(@Body() payload: CreateBrandDTO) {
    return this.brandsService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDTO,
  ) {
    return this.brandsService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.remove(+id)
  }
}
