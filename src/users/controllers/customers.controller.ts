import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common'

import { CustomersService } from '@/users/services/customers.service'
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from '@/users/dtos/customers.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('users', 'customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll()
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id)
  }

  @Post()
  create(@Body() payload: CreateCustomerDTO) {
    return this.customersService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDTO,
  ) {
    return this.customersService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(+id)
  }
}
