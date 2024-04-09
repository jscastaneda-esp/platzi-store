import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'

import { CategoriesService } from '@/products/services/categories.service'
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '@/products/dtos/categories.dto'
import { ApiTags } from '@nestjs/swagger'
import { ParseMongoIdPipe } from '@/common/parse-mongo-id.pipe'

@ApiTags('products', 'categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  get(@Param('id', ParseMongoIdPipe) id: string) {
    return this.categoriesService.findOne(id)
  }

  @Post()
  create(@Body() payload: CreateCategoryDTO) {
    return this.categoriesService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateCategoryDTO,
  ) {
    return this.categoriesService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.categoriesService.remove(id)
  }
}
