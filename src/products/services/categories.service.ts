import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Category } from '@/products/entities/category.entity'
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '@/products/dtos/categories.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(data: CreateCategoryDTO) {
    await this.existsByName(data.name)
    const newCategory = new this.categoryModel(data)
    return newCategory.save()
  }

  findAll() {
    return this.categoryModel.find().exec()
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec()
    if (!category) {
      throw new NotFoundException(`Category with Id ${id} not found`)
    }

    return category
  }

  async update(id: string, changes: UpdateCategoryDTO) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
    if (!category) {
      throw new NotFoundException(`Category with Id ${id} not found`)
    }

    return category
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id).exec()
    if (!category) {
      throw new NotFoundException(`Category with Id ${id} not found`)
    }

    return
  }

  private async existsByName(name: string) {
    const exists = await this.categoryModel.exists({ name }).exec()
    if (exists) {
      throw new ConflictException(`Category with name '${name}' already exists`)
    }
  }
}
