import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Brand } from './brand.entity'

class Category {
  @Prop()
  name: string
}

@Schema()
export class Product extends Document {
  @Prop({ required: true, unique: true })
  name: string

  @Prop()
  description: string

  @Prop({ type: Number, required: true, index: true })
  price: number

  @Prop({ type: Number, required: true })
  stock: number

  @Prop()
  image: string

  // Embebida/Subobjeto
  @Prop()
  category: Category

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product)
ProductSchema.index({ price: 1, stock: 1 })
