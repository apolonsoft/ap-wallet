import { registerAs } from '@nestjs/config';

export default registerAs('cardano', () => ({
  cardanoWalletEndpoint: process.env.CARDANO_WALLET_ENDPOINT,
}));
