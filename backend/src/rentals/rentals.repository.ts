import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

export type RentalWithOwner = Prisma.rentalsGetPayload<{
  include: {
    users: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

@Injectable()
export class RentalsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(
    params: Omit<Prisma.rentalsFindManyArgs, 'include' | 'select'> = {},
  ): Promise<RentalWithOwner[]> {
    return this.prisma.rentals.findMany({
      ...params,
      include: {
        users: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
