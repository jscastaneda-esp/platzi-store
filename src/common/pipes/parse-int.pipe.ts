import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  transform(value: string, _: ArgumentMetadata) {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new BadRequestException(`${value} is not a number`)
    }

    return val
  }
}
