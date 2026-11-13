import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RentalsService } from './rentals.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RentalResponseDto } from './dto/rental-response.dto.js';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request.type.js';

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
    return this.rentalsService.findAll({
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
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Récupérer une location par son ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identifiant de la location',
  })
  @ApiOkResponse({
    description: 'Location récupérée avec succès',
    type: RentalResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Location introuvable',
  })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RentalResponseDto> {
    const rental = await this.rentalsService.findById(id);

    if (!rental) {
      throw new NotFoundException('Location introuvable');
    }

    return rental;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Création d'une location" })
  @ApiBody({ type: CreateRentalDto })
  @ApiCreatedResponse({
    description: 'Location créée avec succès',
    type: RentalResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Les données envoyées sont invalides',
  })
  @ApiUnauthorizedResponse({
    description: 'Utilisateur non connecté',
  })
  create(
    @Body() rentalData: CreateRentalDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<RentalResponseDto> {
    return this.rentalsService.create(rentalData, req.user.id);
  }
}
