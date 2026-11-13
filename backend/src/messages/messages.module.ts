import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { MessagesController } from './messages.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { MessagesRepository } from './messages.repository.js';
import { RentalsModule } from '../rentals/rentals.module.js';

@Module({
  imports: [PrismaModule, RentalsModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
