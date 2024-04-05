import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrderItem } from '../entities/order-item.entity'
import { Product } from '@/products/entities/product.entity'
import { Order } from '../entities/order.entity'
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '../dtos/order-items.dto'

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async create(data: CreateOrderItemDTO) {
    const order = await this.getOrder(data.orderId)
    const product = await this.getProduct(data.productId)
    const item = this.orderItemRepository.create(data)
    item.order = order
    item.product = product
    return this.orderItemRepository.save(item)
  }

  async update(id: number, changes: UpdateOrderItemDTO) {
    const oldItem = await this.orderItemRepository.findOne({
      where: { id },
      relations: { order: true, product: true },
    })
    if (!oldItem) {
      throw new NotFoundException(`Item with Id '${id}' not found`)
    }

    const updatedItem = this.orderItemRepository.merge(oldItem, changes)
    if (changes.orderId && oldItem.order.id != changes.orderId) {
      const order = await this.getOrder(changes.orderId)
      updatedItem.order = order
    }

    if (changes.productId && oldItem.product.id != changes.productId) {
      const product = await this.getProduct(changes.productId)
      updatedItem.product = product
    }

    return this.orderItemRepository.save(oldItem)
  }

  async remove(id: number) {
    const item = await this.orderItemRepository.findOneBy({ id })
    await this.orderItemRepository.remove(item)
  }

  private async getOrder(orderId: number) {
    const order = await this.orderRepository.findOneBy({ id: orderId })
    if (!order) {
      throw new NotFoundException(`Order with Id '${orderId}' not found`)
    }

    return order
  }

  private async getProduct(productId: number) {
    const product = await this.productRepository.findOneBy({
      id: productId,
    })
    if (!product) {
      throw new NotFoundException(`Product with Id '${productId}' not found`)
    }

    return product
  }
}
