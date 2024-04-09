import {
  IsNotEmpty,
  IsDate,
  IsMongoId,
  IsArray,
  ArrayMinSize,
} from 'class-validator'
import { PartialType } from '@nestjs/swagger'

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsDate()
  readonly date: Date

  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  readonly products: string[]
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}

export class AddProductToOrderDTO {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  readonly products: string[]
}
