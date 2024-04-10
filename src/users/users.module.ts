import { Module } from '@nestjs/common'
import { CustomersService } from './services/customers.service'
import { CustomersController } from './controllers/customers.controller'
import { UsersService } from './services/users.service'
import { UsersController } from './controllers/users.controller'
import { ProductsModule } from '@/products/products.module'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './entities/user.entity'
import { Customer, CustomerSchema } from './entities/customer.entity'
import { Order, OrderSchema } from './entities/order.entity'
import { OrdersService } from './services/orders.service'
import { OrdersController } from './controllers/orders.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    ProductsModule,
  ],
  providers: [UsersService, CustomersService, OrdersService],
  controllers: [UsersController, CustomersController, OrdersController],
  exports: [UsersService],
})
export class UsersModule {}
