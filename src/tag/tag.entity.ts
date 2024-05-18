import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class TagEntity {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ default: '#2962FF' })
  color: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserEntity' })
   userId: string;
}
export const TagEntitySchema = SchemaFactory.createForClass(TagEntity);
