import { messages } from '../generated/prisma/client.js';
import { MessageResponseDto } from './dto/message-response.dto.js';

export class MessagesMapper {
  static toResponse(message: messages): MessageResponseDto {
    return {
      id: message.id,
      message: message.message,
      rental_id: message.rental_id,
      user_id: message.user_id,
      created_at: message.created_at?.toString(),
      updated_at: message.updated_at?.toString(),
    };
  }
}
