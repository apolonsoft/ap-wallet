import { ApiProperty } from '@nestjs/swagger';
import { IsString,IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  phone: string;
}

