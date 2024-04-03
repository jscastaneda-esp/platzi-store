import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator'
import { PartialType } from '@nestjs/swagger'

export class CreateCustomerDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}
