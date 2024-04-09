import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Customer } from '@/users/entities/customer.entity'
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from '@/users/dtos/customers.dto'

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  create(data: CreateCustomerDTO) {
    const newCustomer = new this.customerModel(data)
    return newCustomer.save()
  }

  findAll() {
    return this.customerModel.find().exec()
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id).exec()
    if (!customer) {
      throw new NotFoundException(`Customer with Id ${id} not found`)
    }

    return customer
  }

  async update(id: string, changes: UpdateCustomerDTO) {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
    if (!customer) {
      throw new NotFoundException(`Customer with Id ${id} not found`)
    }

    return customer
  }

  async remove(id: string) {
    const customer = await this.customerModel.findByIdAndDelete(id).exec()
    if (!customer) {
      throw new NotFoundException(`Customer with Id ${id} not found`)
    }

    return
  }
}
