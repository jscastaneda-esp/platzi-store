import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Brand } from '../entities/brand.entity'
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brands.dto'

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepository.find()
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: { products: true },
    })
    if (!brand) {
      throw new NotFoundException(`Brand with Id '${id}' not found`)
    }

    return brand
  }

  async create(data: CreateBrandDTO) {
    await this.existsByName(data.name)
    const newBrand = this.brandRepository.create(data)
    return this.brandRepository.save(newBrand)
  }

  async update(id: number, changes: UpdateBrandDTO) {
    const oldBrand = await this.findOne(id)
    if (changes.name && oldBrand.name != changes.name) {
      await this.existsByName(changes.name)
    }

    const updatedBrand = this.brandRepository.merge(oldBrand, changes)
    return this.brandRepository.save(updatedBrand)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    await this.brandRepository.remove(user)
  }

  private async existsByName(name: string) {
    const exists = await this.brandRepository.existsBy({ name })
    if (exists) {
      throw new ConflictException(`Already brand with name '${name}'`)
    }
  }
}
