import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { messages, Prisma } from '../generated/prisma/client.js';

@Injectable()
export class MessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    data: Omit<Prisma.messagesCreateInput, 'users' | 'rentals'>,
    userId: number,
    rentalId: number,
  ): Promise<messages> {
    return this.prisma.messages.create({
      data: {
        ...data,
        users: {
          connect: { id: userId },
        },
        rentals: {
          connect: { id: rentalId },
        },
      },
    });
  }
}
