import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isMongoId } from 'class-validator'

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isMongoId(value)) {
      throw new BadRequestException(`${value} is invalid Mongo ID`)
    }

    return value
  }
}
