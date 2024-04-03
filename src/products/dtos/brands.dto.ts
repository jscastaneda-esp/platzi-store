import { IsString, IsUrl, IsNotEmpty } from 'class-validator'
import { PartialType } from '@nestjs/swagger'

export class CreateBrandDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {}
