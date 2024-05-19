/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DepenseEntity } from './depense.entity';
import { Model } from 'mongoose';
import { DepenseDto } from './dto/DepenseDto.dto';

@Injectable()

export class DepenseService {


  constructor(
    @InjectModel(DepenseEntity.name) private depenseModel: Model<DepenseEntity>,
  ) {}
  

 async crateDepense(DepenseDto: DepenseDto ): Promise<DepenseEntity> {
    
    return this.depenseModel.create(DepenseDto);
  }

  async getAllUserDepenses(userId: string): Promise<DepenseEntity[]> {
    return this.depenseModel.find({ userId }).exec();
  }

  async getDepenseById(depenseId: string): Promise<DepenseEntity> {
    return this.depenseModel.findById(depenseId).exec();
  }

  async updateDepense(depenseId: string, DepenseDto: DepenseDto): Promise<DepenseEntity> {
    return this.depenseModel.findByIdAndUpdate(depenseId, DepenseDto, { new: true });
  }

  async deleteDepense(depenseId: string): Promise<DepenseEntity> {
    return this.depenseModel.findByIdAndDelete(depenseId);
  }

  
}
