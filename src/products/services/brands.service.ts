import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Brand } from '../entities/brand.entity'
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brands.dto'

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async create(data: CreateBrandDTO) {
    await this.existsByName(data.name)
    const newBrand = new this.brandModel(data)
    return newBrand.save()
  }

  findAll() {
    return this.brandModel.find().exec()
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec()
    if (!brand) {
      throw new NotFoundException(`Brand with Id ${id} not found`)
    }

    return brand
  }

  async update(id: string, changes: UpdateBrandDTO) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
    if (!brand) {
      throw new NotFoundException(`Brand with Id ${id} not found`)
    }

    return brand
  }

  async remove(id: string) {
    const brand = await this.brandModel.findByIdAndDelete(id).exec()
    if (!brand) {
      throw new NotFoundException(`Brand with Id ${id} not found`)
    }

    return
  }

  private async existsByName(name: string) {
    const exists = await this.brandModel.exists({ name }).exec()
    if (exists) {
      throw new ConflictException(`Brand with name '${name}' already exists`)
    }
  }
}
