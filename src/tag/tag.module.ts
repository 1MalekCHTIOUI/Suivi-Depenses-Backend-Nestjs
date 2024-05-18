import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagEntity, TagEntitySchema } from './tag.entity';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TagEntity.name, schema: TagEntitySchema },
    ]),
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
