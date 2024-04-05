import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CustomersService } from './customers.service'
import { ProductsService } from '@/products/services/products.service'
import { User } from '@/users/entities/user.entity'
import { CreateUserDTO, UpdateUserDTO } from '@/users/dtos/users.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private customerService: CustomersService,
    private productsService: ProductsService,
  ) {}

  findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { customer: true },
    })
    if (!user) {
      throw new NotFoundException(`User with Id '${id}' not found`)
    }

    return user
  }

  async create(data: CreateUserDTO) {
    await this.existsByEmail(data.email)
    const newUser = this.userRepository.create(data)
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId)
      newUser.customer = customer
    }
    return this.userRepository.save(newUser)
  }

  async update(id: number, changes: UpdateUserDTO) {
    const oldUser = await this.findOne(id)
    if (changes.email && oldUser.email != changes.email) {
      await this.existsByEmail(changes.email)
    }

    const updatedUser = this.userRepository.merge(oldUser, changes)
    if (changes.customerId && oldUser.customer?.id != changes.customerId) {
      const customer = await this.customerService.findOne(changes.customerId)
      updatedUser.customer = customer
    }

    return this.userRepository.save(updatedUser)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
  }

  async findOrder(id: number) {
    const user = this.findOne(id)

    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    }
  }

  private async existsByEmail(email: string) {
    const exists = await this.userRepository.existsBy({ email })
    if (exists) {
      throw new ConflictException(`Already user with email '${email}'`)
    }
  }
}
