import { ICreateUser } from '@apolonsoft/api-interfaces';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '../../database/entities-index';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async createUser(user: ICreateUser): Promise<User> {
    const { email, phone } = user;
    const existingUsers = await this.usersRepository.findAllWithEmailAndPhone(
      email,
      phone
    );
    if (existingUsers.length > 0) {
      throw new HttpException(
        'User already registered.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const createdUser = await this.usersRepository.createUser(user);
    return createdUser;
  }
}
