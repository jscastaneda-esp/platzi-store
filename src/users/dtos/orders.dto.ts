import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly customerId: number
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
