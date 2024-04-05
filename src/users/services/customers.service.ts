import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Customer } from '@/users/entities/customer.entity'
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from '@/users/dtos/customers.dto'

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepository.find()
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: { user: true },
    })
    if (!customer) {
      throw new NotFoundException(`Customer with Id '${id}' not found`)
    }

    return customer
  }

  create(data: CreateCustomerDTO) {
    const newCustomer = this.customerRepository.create(data)
    return this.customerRepository.save(newCustomer)
  }

  async update(id: number, changes: UpdateCustomerDTO) {
    const oldCustomer = await this.findOne(id)
    const updatedCustomer = this.customerRepository.merge(oldCustomer, changes)
    return this.customerRepository.save(updatedCustomer)
  }

  async remove(id: number) {
    const customer = await this.findOne(id)
    await this.customerRepository.remove(customer)
  }
}
