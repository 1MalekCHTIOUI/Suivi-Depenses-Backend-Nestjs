import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TagEntity } from './tag.entity';
import { Model } from 'mongoose';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(TagEntity.name) private tagModel: Model<TagEntity>,
  ) {}

  async createTag(tag: TagDto): Promise<TagEntity> {
    return this.tagModel.create(tag);
  }

  async getTagsByUser(id: string): Promise<TagEntity[]> {
    return this.tagModel.find({ _id: id }).populate('userId');
  }

  async getTag(tagId: string): Promise<TagEntity> {
    return this.tagModel.findById(tagId).populate('userId');
  }

  async updateTag(tagId: string, tag: TagDto): Promise<TagEntity> {
    return this.tagModel.findByIdAndUpdate(tagId, tag, { new: true });
  }

  async deleteTag(tagId: string): Promise<TagEntity> {
    return this.tagModel.findByIdAndDelete(tagId);
  }
}
