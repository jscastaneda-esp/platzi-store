import {
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator'
import { PartialType } from '@nestjs/swagger'
import { CreateCategoryDTO } from './categories.dto'

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number

  @IsUrl()
  @IsNotEmpty()
  readonly image: string

  @IsNotEmptyObject()
  @ValidateNested()
  readonly category: CreateCategoryDTO

  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number = 100

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number = 0

  @ValidateIf((filter) => filter.maxPrice)
  @IsNumber()
  minPrice?: number

  @ValidateIf((filter) => filter.minPrice)
  @IsNumber()
  maxPrice?: number
}
