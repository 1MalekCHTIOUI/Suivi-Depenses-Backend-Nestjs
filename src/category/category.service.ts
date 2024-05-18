import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryEntity } from './category.entity';
import { Model } from 'mongoose';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryEntity.name) private catModel: Model<CategoryEntity>,
  ) {}

  async createCategory(category: CategoryDto): Promise<CategoryEntity> {
    return this.catModel.create(category);
  }

  async getCategoriesByUser(id: string): Promise<CategoryEntity[]> {
    return this.catModel.find({ userId: id }).populate('userId');
  }

  async getCategory(catId: string): Promise<CategoryEntity> {
    return this.catModel.findById(catId).populate('userId');
  }

  async updateCategory(
    catId: string,
    category: CategoryDto,
  ): Promise<CategoryEntity> {
    return this.catModel.findByIdAndUpdate(catId, category, { new: true });
  }

  async deleteCategory(catId: string): Promise<CategoryEntity> {
    return this.catModel.findByIdAndDelete(catId);
  }
}
