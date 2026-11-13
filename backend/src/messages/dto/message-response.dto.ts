import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  rental_id: number;

  @ApiProperty({ example: 1 })
  user_id: number;

  @ApiProperty({
    example: 'Bonjour, votre logement est-il toujours disponible ?',
  })
  message: string;

  @ApiProperty({ example: '2026-11-11T12:00:00.000Z' })
  created_at?: string;

  @ApiProperty({ example: '2026-11-11T12:00:00.000Z' })
  updated_at?: string;
}
