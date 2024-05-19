import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class CategoryEntity {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  budget: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserEntity',
  })
  userId: string;
}
export const CategoryEntitySchema =
  SchemaFactory.createForClass(CategoryEntity);
