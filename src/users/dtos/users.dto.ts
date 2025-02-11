import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator'
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
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
