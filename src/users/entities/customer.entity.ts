import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

class Skill {
  @Prop()
  name: string

  @Prop()
  color: string
}

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true })
  phone: string

  @Prop({ type: Types.Array<Skill> })
  skills: Types.Array<Skill>
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
