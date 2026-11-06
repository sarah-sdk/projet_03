import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard.js';
import { AuthenticatedUser } from './types/authenticated-user.type.js';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

type AuthentificationRequest = Request & {
  user: AuthenticatedUser;
};

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
  async login(@Req() req: AuthentificationRequest) {
    return this.authService.login(req.user);
  }
}
