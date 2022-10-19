import { ICreateUser } from '@apolonsoft/api-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities-index';

export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(user: ICreateUser): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAllWithEmailAndPhone(
    email: string,
    phone: string
  ): Promise<User[]> {
    return this.usersRepository.find({
      where: [{ email }, { phone }],
    });
  }
}
