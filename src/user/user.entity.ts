import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';

@Schema()
export class UserEntity {
  @Prop({ required: true, unique: true })
  username: string;

  // @Prop({ required: true })
  // name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre<UserEntity>('save', async function (next: Function) {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});
