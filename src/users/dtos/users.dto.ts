import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator'
import { PartialType } from '@nestjs/swagger'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string

  @IsNotEmpty()
  readonly role: string

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly customerId?: number
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
