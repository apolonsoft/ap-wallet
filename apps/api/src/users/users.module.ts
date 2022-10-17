import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Wallet } from '../database/entities-index';
@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet])],
  providers: [UsersService],
})
export class UsersModule {}
