import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity, UserEntitySchema } from './user.entity';
import { Model } from 'mongoose';
import { UserResponseType } from './types/userResponse.type';
import { CreateUserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { DecodeResponseType } from './types/decodeResponse.type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new HttpException(
        'Email is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getUserById(id: string): Promise<UserEntity> {
    return this.userModel.findById(id);
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  buildUserResponse(userEntity: UserEntity): UserResponseType {
    return {
      // username: userEntity.username,
      // name: userEntity.name,
      // email: userEntity.email,
      token: this.generateJwt(userEntity),
    };
  }
  buildDecodeResponse(userEntity: any): any {
    return {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
    };
  }

  generateJwt(userEntity: UserEntity): string {
    return sign({ email: userEntity.email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userModel.findOne({ email });
  }
}
