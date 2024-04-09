import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator'
import { Type } from 'class-transformer'
import { PartialType } from '@nestjs/swagger'

export class SkillDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  color: string
}

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

  @IsArray()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => SkillDTO)
  readonly skills: SkillDTO[]
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}
