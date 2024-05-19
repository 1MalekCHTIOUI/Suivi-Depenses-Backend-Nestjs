/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepenseService } from './depense.service';
import { DepenseController } from './depense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepenseEntity, DepenseEntitySchema } from './depense.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: DepenseEntity.name, schema: DepenseEntitySchema }]),
  controllers: [DepenseController],
  providers: [DepenseService],
})
export class DepenseModule {}
