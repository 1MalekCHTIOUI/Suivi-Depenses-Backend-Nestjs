import { UserEntity } from '../user.entity';

export type DecodeResponseType = Omit<UserEntity, 'password'>;
