import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LocalAuthGuard } from './local-auth.guard.js';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { AuthenticatedRequest } from './types/authenticated-request.type.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { UserResponseDto } from '../users/dto/user-response.dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Inscription',
    description: 'Permet de créer un nouvel utilisateur',
  })
  @ApiCreatedResponse({
    description: 'Utilisateur créé avec succès',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiConflictResponse({
    description: 'Cette adresse e-mail est déjà utilisée',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Connexion',
    description: 'Authentifie un utilisateur et retourne un JWT',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'geralt-de-riv@example.com',
        },
        password: {
          type: 'string',
          example: 'MySecurePassword123!',
        },
      },
      required: ['email', 'password'],
    },
  })
  @ApiOkResponse({
    description: 'Authentification réussie',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Identifiants incorrects',
  })
  async login(@Req() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Récupérer l'utilisateur connecté" })
  @ApiOkResponse({
    description: 'Utilisateur récupéré avec succès',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Utilisateur non authentifié ou token invalide',
  })
  async getMe(@Req() req: AuthenticatedRequest): Promise<UserResponseDto> {
    return this.authService.getMe(req.user.id);
  }
}
