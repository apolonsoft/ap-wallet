import { Controller } from '@nestjs/common';
import { ApiNetworkInformation } from 'cardano-wallet-js';
import { CardanoService } from '../services/cardano.service';

@Controller('cardano')
export class CardanoController {
  constructor(private readonly cardanoService: CardanoService) {}

  async getInfo(): Promise<ApiNetworkInformation> {
    return this.cardanoService.getInfo();
  }
}
