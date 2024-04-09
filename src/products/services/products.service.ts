import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Product } from '@/products/entities/product.entity'
import {
  CreateProductDTO,
  FilterProductDTO,
  UpdateProductDTO,
} from '@/products/dtos/products.dto'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(data: CreateProductDTO) {
    await this.existsByName(data.name)
    const newProduct = new this.productModel(data)
    return newProduct.save()
  }

  findAll(filter?: FilterProductDTO) {
    if (filter) {
      const { limit, offset, minPrice, maxPrice } = filter

      const filters: FilterQuery<Product> = {}
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice }
      }

      return this.productModel.find(filters).limit(limit).skip(offset)
    }

    return this.productModel.find().exec()
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('brand')
      .exec()
    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`)
    }

    return product
  }

  async update(id: string, changes: UpdateProductDTO) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`)
    }

    return product
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec()
    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`)
    }

    return
  }

  private async existsByName(name: string) {
    const exists = await this.productModel.exists({ name }).exec()
    if (exists) {
      throw new ConflictException(`Product with name '${name}' already exists`)
    }
  }
}
