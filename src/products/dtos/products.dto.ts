import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator'
import { PartialType } from '@nestjs/swagger'

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

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly brandId: number

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly categoryIds: number[]
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductsDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number = 100

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number = 0

  @ValidateIf((item) => item.maxPrice)
  @IsNumber()
  minPrice: number

  @ValidateIf((item) => item.minPrice)
  @IsNumber()
  maxPrice: number
}
