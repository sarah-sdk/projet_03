import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, users } from '../generated/prisma/client.js';
import { UsersRepository } from './users.repository.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findByEmail(email: string): Promise<users | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: number, userId: number): Promise<users> {
    if (id !== userId) {
      throw new ForbiddenException(
        'Utilisateur connecté différent de celui demandé',
      );
    }
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    return user;
  }

  findAll(params: Prisma.usersFindManyArgs = {}): Promise<users[]> {
    return this.usersRepository.findAll(params);
  }

  create(data: Prisma.usersCreateInput): Promise<users> {
    return this.usersRepository.create(data);
  }
}
