import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CardanoController } from './controllers/cardano.controller';
import { CardanoService } from './services/cardano.service';

@Module({
  imports: [ConfigModule],
  providers: [CardanoService],
  exports: [CardanoService],
  controllers: [CardanoController],
})
export class BlockchainModule {}
