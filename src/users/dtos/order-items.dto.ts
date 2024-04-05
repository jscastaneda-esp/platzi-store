import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class CreateOrderItemDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly orderId: number

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly productId: number

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number
}

export class UpdateOrderItemDTO extends PartialType(CreateOrderItemDTO) {}
