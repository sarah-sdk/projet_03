import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { users as UserModel } from '../generated/prisma/client.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query('search') search?: string): Promise<UserModel[]> {
    return this.usersService.findAll({
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
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserModel | null> {
    return this.usersService.findById(id);
  }
}
