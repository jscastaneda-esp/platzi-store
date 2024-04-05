import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Product } from './product.entity'

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255, unique: true })
  name: string

  @Column()
  image: string

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

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[]
}
