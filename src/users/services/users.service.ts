import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@/users/entities/user.entity'
import { CreateUserDTO, UpdateUserDTO } from '@/users/dtos/users.dto'
import { Order } from '../entities/order.entity'
import { ProductsService } from '@/products/services/products.service'
import { CONFIG_KEY, Config } from '@/config'

@Injectable()
export class UsersService {
  private counterId = 1
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '$2b$10$Uk5jusD57zZpPUhmOCscY.yr0V4gGeElANFT.0x1wAUERWu5rSf1W',
      role: 'adminss',
    },
  ]

  constructor(
    private productsService: ProductsService,
    @Inject(CONFIG_KEY) private configType: Config,
  ) {}

  findAll() {
    console.log(this.configType.apiKey)
    console.log(this.configType.database.port)
    console.log(this.configType.database.name)
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id)
    if (!user) {
      throw new NotFoundException(`User #${id} not found`)
    }
    return user
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email)
  }

  create(data: CreateUserDTO) {
    this.counterId = this.counterId + 1
    const newUser = {
      id: this.counterId,
      ...data,
    }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, changes: UpdateUserDTO) {
    const user = this.findOne(id)
    const index = this.users.findIndex((item) => item.id === id)
    this.users[index] = {
      ...user,
      ...changes,
    }
    return this.users[index]
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`)
    }
    this.users.splice(index, 1)
    return true
  }

  findOrder(id: number): Order {
    const user = this.findOne(id)

    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    }
  }
}
