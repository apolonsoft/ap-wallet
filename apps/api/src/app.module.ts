import { Module } from '@nestjs/common';
import database from '../config/db.config';
import cardano from '../config/cardano.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainModule } from './blockchain/blockchain.module';
import * as entities from './database/entities-index';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionsFilter } from './common/filters/global-exceptions.filter';
import {ThrottlerModule} from '@nestjs/throttler';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      load: [database, cardano],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        synchronize: configService.get<boolean>('database.synchronize'),
        entities: Object.values(entities),
        // logging: 'all',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    BlockchainModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
  ],
})
export class AppModule {}
