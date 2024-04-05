import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindManyOptions, In, Repository } from 'typeorm'
import { Product } from '@/products/entities/product.entity'
import {
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
} from '@/products/dtos/products.dto'
import { Category } from '../entities/category.entity'
import { Brand } from '../entities/brand.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async create(data: CreateProductDTO) {
    await this.existsByName(data.name)
    const newProduct = this.productRepository.create(data)

    const brand = await this.getBrand(data.brandId)
    newProduct.brand = brand

    const categories = await this.getCategories(data.categoryIds)
    newProduct.categories = categories

    return this.productRepository.save(newProduct)
  }

  findAll(filter?: FilterProductsDTO) {
    const options: FindManyOptions<Product> = {}
    if (filter) {
      const { limit, offset, minPrice, maxPrice } = filter
      options.take = limit
      options.skip = offset
      options.where = {}

      if (minPrice && maxPrice) {
        options.where = {
          ...options.where,
          price: Between(minPrice, maxPrice),
        }
      }
    }

    return this.productRepository.find(options)
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { brand: true, categories: true },
    })
    if (!product) {
      throw new NotFoundException(`Product with Id '${id}' not found`)
    }

    return product
  }

  async update(id: number, changes: UpdateProductDTO) {
    const oldProduct = await this.findOne(id)
    if (changes.name && oldProduct.name != changes.name) {
      await this.existsByName(changes.name)
    }

    const updatedProduct = this.productRepository.merge(oldProduct, changes)
    if (changes.brandId && oldProduct.brand.id != changes.brandId) {
      const brand = await this.getBrand(changes.brandId)
      updatedProduct.brand = brand
    }

    if (changes.categoryIds?.length) {
      const categories = await this.getCategories(changes.categoryIds)
      updatedProduct.categories = categories
    }

    return this.productRepository.save(updatedProduct)
  }

  async remove(id: number) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)
  }

  async addCategory(id: number, categoryId: number) {
    const product = await this.findOne(id)
    const existsCategory = product.categories.findIndex(
      (category) => category.id == categoryId,
    )
    if (existsCategory >= 0) {
      throw new ConflictException(
        `Category with Id '${categoryId}' already exists in product with Id '${id}'`,
      )
    }

    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    })
    if (!category) {
      throw new NotFoundException(`Category with Id '${categoryId}' not found`)
    }

    product.categories.push(category)
    return this.productRepository.save(product)
  }

  async removeCategory(id: number, categoryId: number) {
    const product = await this.findOne(id)
    const oldSize = product.categories.length
    product.categories = product.categories.filter(
      (category) => category.id != categoryId,
    )

    if (product.categories.length == oldSize) {
      throw new NotFoundException(
        `Category with Id '${categoryId}' not found in product with Id '${id}'`,
      )
    }

    return this.productRepository.save(product)
  }

  private async existsByName(name: string) {
    const exists = await this.productRepository.existsBy({ name })
    if (exists) {
      throw new ConflictException(`Already product with name '${name}'`)
    }
  }

  private async getBrand(brandId: number) {
    const brand = await this.brandRepository.findOneBy({ id: brandId })
    if (!brand) {
      throw new NotFoundException(`Brand with Id '${brandId}' not found`)
    }

    return brand
  }

  private async getCategories(categoryIds: number[]) {
    const categories = await this.categoryRepository.findBy({
      id: In(categoryIds),
    })
    if (categories.length != categoryIds.length) {
      throw new ConflictException(
        `Categories with Ids '${categoryIds}' not found`,
      )
    }
    return categories
  }
}
