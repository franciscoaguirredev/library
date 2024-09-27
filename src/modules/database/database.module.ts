import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './database.service';
import { BookService } from '../book/book.service';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    BookModule
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})

export class DatabaseModule implements OnModuleInit{
  constructor(private readonly bookService:BookService){}
  async onModuleInit() {
    setTimeout(async () => {
      await this.bookService.loadBooksDefault();
      console.log('Books loaded');
    }, 2000)
}
}