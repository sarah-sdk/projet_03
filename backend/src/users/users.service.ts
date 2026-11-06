import { Injectable } from '@nestjs/common';
import { Prisma, users } from '../generated/prisma/client.js';
import { UsersRepository } from './users.repository.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findByEmail(email: string): Promise<users | null> {
    return this.usersRepository.findByEmail(email);
  }

  findById(id: number): Promise<users | null> {
    return this.usersRepository.findById(id);
  }

  findAll(params: Prisma.usersFindManyArgs = {}): Promise<users[]> {
    return this.usersRepository.findAll(params);
  }

  create(data: Prisma.usersCreateInput): Promise<users> {
    return this.usersRepository.create(data);
  }
}
