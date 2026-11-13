import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesRepository } from './messages.repository.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { MessageResponseDto } from './dto/message-response.dto.js';
import { RentalsService } from '../rentals/rentals.service.js';
import { MessagesMapper } from './messages.mapper.js';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly rentalsService: RentalsService,
  ) {}

  async create(
    messagesData: CreateMessageDto,
    userId: number,
  ): Promise<MessageResponseDto> {
    const rental = await this.rentalsService.findById(messagesData.rental_id);

    if (!rental) {
      throw new NotFoundException('Location introuvable');
    }

    const message = await this.messagesRepository.create(
      { message: messagesData.message },
      userId,
      rental.id,
    );

    return MessagesMapper.toResponse(message);
  }
}
