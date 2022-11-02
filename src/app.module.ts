import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
