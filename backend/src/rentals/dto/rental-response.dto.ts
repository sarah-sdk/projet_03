import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RentalOwnerResponseDto } from './rental-owner-response.dto.js';

export class RentalResponseDto {
  @ApiProperty({ example: 42 })
  id: number;

  @ApiProperty({ example: 'Appartement cosy' })
  name: string;

  @ApiProperty({ example: '45.50' })
  surface: string;

  @ApiProperty({ example: '750.00' })
  price: string;

  @ApiPropertyOptional({ nullable: true })
  picture: string | null;

  @ApiProperty({ example: 'Bel appartement en centre-ville' })
  description: string;

  @ApiProperty({ type: () => RentalOwnerResponseDto })
  owner: RentalOwnerResponseDto;

  @ApiPropertyOptional({ nullable: true })
  created_at: Date | null;

  @ApiPropertyOptional({ nullable: true })
  updated_at: Date | null;
}
