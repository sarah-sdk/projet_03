import { RentalWithOwner } from './rentals.repository.js';
import { RentalResponseDto } from './dto/rental-response.dto.js';

export class RentalsMapper {
  static toResponse(rental: RentalWithOwner): RentalResponseDto {
    return {
      id: rental.id,
      name: rental.name,
      surface: rental.surface.toString(),
      price: rental.price.toString(),
      picture: rental.picture,
      description: rental.description,
      owner: {
        id: rental.users.id,
        name: rental.users.name,
      },
      created_at: rental.created_at,
      updated_at: rental.updated_at,
    };
  }
}
