import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  WalletServer,
  Seed,
  ApiNetworkInformation,
  ShelleyWallet,
} from 'cardano-wallet-js';
import { CreateCardanoWalletDto } from '@apolonsoft/api-interfaces';
@Injectable()
export class CardanoService {
  private logger: Logger = new Logger(CardanoService.name);
  walletServer: WalletServer;

  constructor(private readonly configService: ConfigService) {
    const cardanoWalletEndpoint = this.configService.get<string>(
      'cardano.cardanoWalletEndpoint'
    );
    if(cardanoWalletEndpoint){
      this.walletServer = WalletServer.init(cardanoWalletEndpoint);
    }
    this.logger.log('Cardano Wallet Server Initialized');
  }

  async getInfo(): Promise<ApiNetworkInformation> {
    return this.walletServer.getNetworkInformation();
  }

  async createOrRecoverCardanoWallet(
    dto: CreateCardanoWalletDto
  ): Promise<ShelleyWallet> {
    const { name, passphrase } = dto;
    const recoveryPhrase = Seed.generateRecoveryPhrase();
    const mnemonicSentence = Seed.toMnemonicList(recoveryPhrase);
    return this.walletServer.createOrRestoreShelleyWallet(
      name,
      mnemonicSentence,
      passphrase
    );
  }
}
