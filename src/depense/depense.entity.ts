/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose  from 'mongoose';


@Schema()
export class DepenseEntity {

  
  @Prop({ required: true })
  montant: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: Schema.Types.ObjectId, ref: 'Category', required: true })
  categoryId: string;

  @Prop({ type: Schema.Types.ObjectId, ref: 'Tag', required: true })
  tagId: string;
}

export const DepenseEntitySchema = SchemaFactory.createForClass(DepenseEntity);
