import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { DepenseModule } from './depense/depense.module';
import { MailerModule } from './mailer/mailer.module';
import { MailerModule as MailModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_LOCAL_URL),
    UserModule,
    CategoryModule,
    TagModule,
    DepenseModule,
    MailerModule,
    MailModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private privateRoutes = [
    'tags',
    'categories',
    { path: '/api/auth/user', method: RequestMethod.ALL },
  ];

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...this.privateRoutes);
  }
}
