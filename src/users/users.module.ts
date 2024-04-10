import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsModule } from '@/products/products.module'
import { CustomersController } from './controllers/customers.controller'
import { UsersController } from './controllers/users.controller'
import { CustomersService } from './services/customers.service'
import { UsersService } from './services/users.service'
import { User } from './entities/user.entity'
import { Customer } from './entities/customer.entity'
import { Order } from './entities/order.entity'
import { OrderItem } from './entities/order-item.entity'
import { OrdersService } from './services/orders.service'
import { OrdersController } from './controllers/orders.controller'
import { OrderItemsService } from './services/order-items.service'
import { OrderItemsController } from './controllers/order-items.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
    ProductsModule,
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderItemsService],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderItemsController,
  ],
  exports: [UsersService],
})
export class UsersModule {}
