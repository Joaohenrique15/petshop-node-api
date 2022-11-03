import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/petshopApi'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
