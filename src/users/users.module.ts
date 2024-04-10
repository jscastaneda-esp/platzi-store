import { Module } from '@nestjs/common'
import { CustomersService } from './services/customers.service'
import { CustomersController } from './controllers/customers.controller'
import { UsersService } from './services/users.service'
import { UsersController } from './controllers/users.controller'
import { ProductsModule } from '@/products/products.module'

@Module({
  imports: [ProductsModule],
  providers: [UsersService, CustomersService],
  controllers: [UsersController, CustomersController],
  exports: [UsersService],
})
export class UsersModule {}
