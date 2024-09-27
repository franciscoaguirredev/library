import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './modules/database/database.module';
import { BookModule } from './modules/book/book.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [DatabaseModule, BookModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
  exports:[],
})
export class AppModule {}
