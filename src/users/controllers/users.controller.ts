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

import { UsersService } from '@/users/services/users.service'
import { CreateUserDTO, UpdateUserDTO } from '@/users/dtos/users.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOrder(id)
  }

  @Post()
  create(@Body() payload: CreateUserDTO) {
    return this.usersService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDTO,
  ) {
    return this.usersService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id)
  }
}
