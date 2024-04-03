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

import { CategoriesService } from '@/products/services/categories.service'
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '@/products/dtos/categories.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('products', 'categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id)
  }

  @Post()
  create(@Body() payload: CreateCategoryDTO) {
    return this.categoriesService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDTO,
  ) {
    return this.categoriesService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(+id)
  }
}
