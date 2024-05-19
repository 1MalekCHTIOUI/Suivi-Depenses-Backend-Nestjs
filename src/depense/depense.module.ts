/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepenseService } from './depense.service';
import { DepenseController } from './depense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepenseEntity, DepenseEntitySchema } from './depense.entity';
import { MailerModule } from 'src/mailer/mailer.module';
import { CategoryModule } from 'src/category/category.module';

import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MailerModule,
    CategoryModule,
    UserModule,
    MongooseModule.forFeature([
      { name: DepenseEntity.name, schema: DepenseEntitySchema },
    ]),
  ],
  controllers: [DepenseController],
  providers: [DepenseService],
})
export class DepenseModule {}
