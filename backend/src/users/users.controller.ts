import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { UserResponseDto } from './dto/user-response.dto.js';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: "Recherche sur le nom et l'email",
  })
  @ApiOkResponse({
    description: 'Liste des utilisateurs récupérée avec succès',
    type: UserResponseDto,
    isArray: true,
  })
  async findAll(@Query('search') search?: string): Promise<UserResponseDto[]> {
    const users = this.usersService.findAll({
      where: search
        ? {
            OR: [
              { name: { contains: search } },
              { email: { contains: search } },
            ],
          }
        : undefined,
      orderBy: { id: 'asc' },
    });

    return (await users).map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: "Identifiant de l'utilisateur",
  })
  @ApiOkResponse({
    description: 'Utilisateur récupéré avec succès',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Utilisateur introuvable',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
