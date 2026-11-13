import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request.type.js';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    @Request() req: AuthenticatedRequest,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id, req.user.id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
