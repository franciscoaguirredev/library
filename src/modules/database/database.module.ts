import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseModule{}