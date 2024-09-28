import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {EnvConfig} from '../common/config/env.config'

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log({ envConfig: EnvConfig() });
    return {
        type: 'postgres',
        host: EnvConfig().host,
        port: EnvConfig().port,
        database: EnvConfig().name,
        username: EnvConfig().username,
        password: EnvConfig().password,
        autoLoadEntities: true,
        dropSchema: false,
        synchronize: true,      
      };
  }
}