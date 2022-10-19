import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateCardanoWalletDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  passphrase: string;
}
