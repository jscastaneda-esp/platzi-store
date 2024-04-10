import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'
import { UsersService } from '@/users/services/users.service'
import { CreateUserDTO, UpdateUserDTO } from '@/users/dtos/users.dto'
import { ApiTags } from '@nestjs/swagger'
import { ParseMongoIdPipe } from '@/common/parse-mongo-id.pipe'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  get(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.findOne(id)
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.findOrder(id)
  }

  @Post()
  create(@Body() payload: CreateUserDTO) {
    return this.usersService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateUserDTO,
  ) {
    return this.usersService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.remove(id)
  }
}
