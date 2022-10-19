import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Wallet } from '../database/entities-index';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet])],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService,]
})
export class UsersModule {}
