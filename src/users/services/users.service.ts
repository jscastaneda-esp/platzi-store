import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '@/users/entities/user.entity'
import { CreateUserDTO, UpdateUserDTO } from '@/users/dtos/users.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDTO) {
    await this.existsByEmail(data.email)
    const newUser = new this.userModel(data)
    newUser.password = await bcrypt.hash(newUser.password, 10)
    return newUser.save()
  }

  findAll() {
    return this.userModel.find().select('-password').exec()
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password').exec()
    if (!user) {
      throw new NotFoundException(`User with Id ${id} not found`)
    }

    return user
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).select('-password').exec()
  }

  async update(id: string, changes: UpdateUserDTO) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
    if (!user) {
      throw new NotFoundException(`User with Id ${id} not found`)
    }

    return user
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec()
    if (!user) {
      throw new NotFoundException(`User with Id ${id} not found`)
    }

    return
  }

  async findOrder(id: string) {
    // const user = this.findOne(id)
    // return {
    //   date: new Date(),
    //   user,
    //   products: await this.productsService.findAll(),
    // }
  }

  private async existsByEmail(email: string) {
    const exists = await this.userModel.exists({ email }).exec()
    if (exists) {
      throw new ConflictException(`User with email '${email}' already exists`)
    }
  }
}
