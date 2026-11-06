import { Injectable } from '@nestjs/common';
import { RentalsRepository, RentalWithOwner } from './rentals.repository.js';
import { Prisma, rentals } from '../generated/prisma/client.js';

@Injectable()
export class RentalsService {
  constructor(private readonly rentalsRepository: RentalsRepository) {}

  findAll(
    params: Omit<Prisma.rentalsFindManyArgs, 'include' | 'select'> = {},
  ): Promise<RentalWithOwner[]> {
    return this.rentalsRepository.findAll(params);
  }

  findById(id: number): Promise<RentalWithOwner | null> {
    return this.rentalsRepository.findById(id);
  }
}
