import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'
import { Order } from './order.entity'

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  @Column({ name: 'last_name', length: 500 })
  lastName: string

  @Column({ length: 20 })
  phone: string

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user?: User

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]
}
