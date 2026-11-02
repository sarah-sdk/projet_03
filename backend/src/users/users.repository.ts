import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma, users } from '../generated/prisma/client.js';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<users | null> {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<users | null> {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async findAll(
    params: {
      skip?: number;
      take?: number;
      where?: Prisma.usersWhereInput;
      orderBy?: Prisma.usersOrderByWithRelationInput;
    } = {},
  ): Promise<users[]> {
    return this.prisma.users.findMany(params);
  }

  async create(data: Prisma.usersCreateInput): Promise<users> {
    return this.prisma.users.create({ data });
  }
}
