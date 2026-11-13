import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { RentalsController } from './rentals.controller.js';
import { RentalsRepository } from './rentals.repository.js';

@Module({
  imports: [PrismaModule],
  controllers: [RentalsController],
  providers: [RentalsService, RentalsRepository],
  exports: [RentalsService],
})
export class RentalsModule {}
