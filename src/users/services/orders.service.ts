import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from '../entities/order.entity'
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/orders.dto'
import { Customer } from '../entities/customer.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepository.find()
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { customer: true, items: { product: true } },
    })
    if (!order) {
      throw new NotFoundException(`Order with Id '${id}' not found`)
    }

    return order
  }

  async create(data: CreateOrderDTO) {
    const newOrder = new Order()

    const customer = await this.getCustomer(data.customerId)
    newOrder.customer = customer

    return this.orderRepository.save(newOrder)
  }

  async update(id: number, changes: UpdateOrderDTO) {
    const oldOrder = await this.findOne(id)

    const updatedOrder = oldOrder
    if (changes.customerId && oldOrder.customer.id != changes.customerId) {
      const customer = await this.getCustomer(changes.customerId)
      updatedOrder.customer = customer
    }

    return this.orderRepository.save(updatedOrder)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    await this.orderRepository.remove(user)
  }

  private async getCustomer(customerId: number) {
    const customer = await this.customerRepository.findOneBy({ id: customerId })
    if (!customer) {
      throw new NotFoundException(`Customer with Id '${customerId}' not found`)
    }

    return customer
  }
}
