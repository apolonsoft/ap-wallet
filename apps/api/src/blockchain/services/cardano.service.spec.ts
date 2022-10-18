import {  ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CardanoService } from './cardano.service';

describe('CardanoService', () => {
  let service: CardanoService;
  let config: ConfigService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardanoService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'cardano.cardanoWalletEndpoint') {
                return 'http://localhost:8090/v2';
              }
              return null;
            })
          },
        },
      ],
    }).compile();

    config = module.get<ConfigService>(ConfigService);
    service = module.get<CardanoService>(CardanoService);
  });

  it("should not create a walletServer if there's no cardanoWalletEndpoint key", async () => {
    jest.spyOn(config, 'get').mockReturnValueOnce(undefined);
    expect(service.walletServer).toBeUndefined();
  });

  it('should be defined walletServer', () => {
    expect(service.walletServer).toBeDefined();
  });
});
