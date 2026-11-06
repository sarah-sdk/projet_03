import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RentalsService } from './rentals.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RentalResponseDto } from './dto/rental-response.dto.js';

@ApiTags('Rentals')
@ApiBearerAuth()
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Récupérer toutes les locations',
    description:
      'Retourne les locations avec les informations de leur propriétaire.',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Recherche sur le nom et la description.',
    example: 'Appartement',
  })
  @ApiOkResponse({
    description: 'Liste des locations récupérée avec succès.',
    type: RentalResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentification requise ou token JWT invalide.',
  })
  async findAll(
    @Query('search') search?: string,
  ): Promise<RentalResponseDto[]> {
    const rentals = await this.rentalsService.findAll({
      where: search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : undefined,
      orderBy: { id: 'asc' },
    });

    return rentals.map((rental) => ({
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
    }));
  }
}
