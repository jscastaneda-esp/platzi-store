import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { OrderItemsService } from '../services/order-items.service'
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '../dtos/order-items.dto'

@Controller('order-items')
export class OrderItemsController {
  constructor(private orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDTO) {
    return this.orderItemsService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderItemDTO,
  ) {
    return this.orderItemsService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.remove(id)
  }
}
