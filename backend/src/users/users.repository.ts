import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma, users } from '../generated/prisma/client.js';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string): Promise<users | null> {
    return this.prisma.users.findUnique({ where: { email } });
  }

  findById(id: number): Promise<users | null> {
    return this.prisma.users.findUnique({ where: { id } });
  }

  findAll(params: Prisma.usersFindManyArgs = {}): Promise<users[]> {
    return this.prisma.users.findMany(params);
  }

  create(data: Prisma.usersCreateInput): Promise<users> {
    return this.prisma.users.create({ data });
  }
}
