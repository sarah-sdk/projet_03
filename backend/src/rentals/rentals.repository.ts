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

  findById(id: number): Promise<RentalWithOwner | null> {
    return this.prisma.rentals.findUnique({
      where: { id },
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

  create(
    data: Omit<Prisma.rentalsCreateInput, 'users'>,
    userId: number,
  ): Promise<RentalWithOwner> {
    return this.prisma.rentals.create({
      data: {
        ...data,
        users: {
          connect: { id: userId },
        },
      },
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

  update(
    id: number,
    data: Prisma.rentalsUpdateInput,
  ): Promise<RentalWithOwner> {
    return this.prisma.rentals.update({
      where: { id },
      data,
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
