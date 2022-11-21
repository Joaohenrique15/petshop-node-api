import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { StoreModule } from './modules/store/store.module';
import { ScheduleModule } from './modules/schedule/schedule.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'petshopapi',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BackofficeModule,
    StoreModule,
    ScheduleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
