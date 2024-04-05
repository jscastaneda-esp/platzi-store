import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from '@/products/entities/category.entity'
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '@/products/dtos/categories.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find()
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { products: true },
    })
    if (!category) {
      throw new NotFoundException(`Category with Id '${id}' not found`)
    }

    return category
  }

  async create(data: CreateCategoryDTO) {
    await this.existsByName(data.name)
    const newCategory = this.categoryRepository.create(data)
    return this.categoryRepository.save(newCategory)
  }

  async update(id: number, changes: UpdateCategoryDTO) {
    const oldCategory = await this.findOne(id)
    if (changes.name && oldCategory.name != changes.name) {
      await this.existsByName(changes.name)
    }

    const updatedCategory = this.categoryRepository.merge(oldCategory, changes)
    return this.categoryRepository.save(updatedCategory)
  }

  async remove(id: number) {
    const category = await this.findOne(id)
    await this.categoryRepository.remove(category)
  }

  private async existsByName(name: string) {
    const exists = await this.categoryRepository.existsBy({ name })
    if (exists) {
      throw new ConflictException(`Already category with name '${name}'`)
    }
  }
}
