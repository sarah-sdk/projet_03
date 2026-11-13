import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request.type.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { MessagesService } from './messages.service.js';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MessageResponseDto } from './dto/message-response.dto.js';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Création d'un message sur une location" })
  @ApiBearerAuth()
  @ApiBody({
    type: CreateMessageDto,
  })
  @ApiCreatedResponse({
    description: 'Message créé avec succès',
    type: MessageResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Les données envoyées sont invalides',
  })
  @ApiUnauthorizedResponse({ description: 'Utilisateur non connecté' })
  create(
    @Body() messageData: CreateMessageDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<MessageResponseDto> {
    return this.messagesService.create(messageData, req.user.id);
  }
}
