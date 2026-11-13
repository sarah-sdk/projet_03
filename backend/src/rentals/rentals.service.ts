import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RentalsRepository } from './rentals.repository.js';
import { Prisma } from '../generated/prisma/client.js';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import { RentalResponseDto } from './dto/rental-response.dto.js';
import { RentalsMapper } from './rentals.mapper.js';
import { UpdateRentalDto } from './dto/update-rental.dto.js';

@Injectable()
export class RentalsService {
  constructor(private readonly rentalsRepository: RentalsRepository) {}

  async findAll(
    params: Omit<Prisma.rentalsFindManyArgs, 'include' | 'select'> = {},
  ): Promise<RentalResponseDto[]> {
    const rentals = await this.rentalsRepository.findAll(params);

    return rentals.map((rental) => RentalsMapper.toResponse(rental));
  }

  async findById(id: number): Promise<RentalResponseDto | null> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      return null;
    }

    return RentalsMapper.toResponse(rental);
  }

  async create(
    rentalData: CreateRentalDto,
    userId: number,
  ): Promise<RentalResponseDto> {
    const rental = await this.rentalsRepository.create(rentalData, userId);

    return RentalsMapper.toResponse(rental);
  }

  async update(
    rentalId: number,
    rentalData: UpdateRentalDto,
    userId: number,
  ): Promise<RentalResponseDto> {
    const rental = await this.rentalsRepository.findById(rentalId);

    if (!rental) {
      throw new NotFoundException('Location introuvable');
    }

    if (rental.users.id != userId) {
      throw new ForbiddenException(
        'Seul le propriétaire de la location peut la modifier',
      );
    }

    const updatedRental = await this.rentalsRepository.update(
      rentalId,
      rentalData,
    );

    return RentalsMapper.toResponse(updatedRental);
  }
}
