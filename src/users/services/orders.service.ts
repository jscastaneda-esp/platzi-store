import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Order } from '../entities/order.entity'
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/orders.dto'

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  create(data: CreateOrderDTO) {
    const newOrder = new this.orderModel(data)
    return newOrder.save()
  }

  findAll() {
    return this.orderModel.find().exec()
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate(['customer', 'products'])
      .exec()
    if (!order) {
      throw new NotFoundException(`Order with Id ${id} not found`)
    }

    return order
  }

  async update(id: string, changes: UpdateOrderDTO) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
    if (!order) {
      throw new NotFoundException(`Order with Id ${id} not found`)
    }

    return order
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id).exec()
    if (!order) {
      throw new NotFoundException(`Order with Id ${id} not found`)
    }

    return
  }

  async addProduct(id: string, productIds: string[]) {
    const order = await this.orderModel.findById(id)
    const oldProducts = order.products.map((product) => product.toString())
    const newProducts = productIds.filter(
      (productId) => !oldProducts.includes(productId),
    )
    if (newProducts.length) {
      return order
    }

    order.products.push(...newProducts)
    return order.save()
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id).exec()
    order.products.pull(productId)
    return order.save()
  }
}
