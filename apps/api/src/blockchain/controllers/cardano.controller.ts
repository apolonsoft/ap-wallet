import { Controller } from '@nestjs/common';
import { CardanoService } from '../services/cardano.service';

@Controller('cardano')
export class CardanoController {
  constructor(private readonly cardanoService: CardanoService) {}
}
