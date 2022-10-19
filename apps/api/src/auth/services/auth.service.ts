import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../database/entities-index';
import { ICreateUser } from '@apolonsoft/api-interfaces';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, plainTextPassword: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await this.verifyPassword(plainTextPassword, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: ICreateUser): Promise<User> {
    const { password: plainPassword } = data;
    const password = await bcrypt.hash(plainPassword, 10);
    return this.usersService.createUser({
      ...data,
      password,
    });
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
