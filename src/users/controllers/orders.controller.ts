import { ParseMongoIdPipe } from '@/common/parse-mongo-id.pipe'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { OrdersService } from '../services/orders.service'
import {
  AddProductToOrderDTO,
  CreateOrderDTO,
  UpdateOrderDTO,
} from '../dtos/orders.dto'

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll()
  }

  @Get(':id')
  get(@Param('id', ParseMongoIdPipe) id: string) {
    return this.ordersService.findOne(id)
  }

  @Post()
  create(@Body() payload: CreateOrderDTO) {
    return this.ordersService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateOrderDTO,
  ) {
    return this.ordersService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.ordersService.remove(id)
  }

  @Put(':id/product')
  addProduct(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: AddProductToOrderDTO,
  ) {
    return this.ordersService.addProduct(id, payload.products)
  }

  @Delete(':id/product/:product')
  removeProduct(
    @Param('id', ParseMongoIdPipe) id: string,
    @Param('product', ParseMongoIdPipe) product: string,
  ) {
    return this.ordersService.removeProduct(id, product)
  }
}
