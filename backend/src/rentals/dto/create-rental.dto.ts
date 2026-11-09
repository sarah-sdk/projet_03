import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRentalDto {
  @ApiProperty({ example: 'Appartement cosy' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: '45.50' })
  @IsNumberString()
  @IsNotEmpty()
  surface: string;

  @ApiProperty({ example: '750.00' })
  @IsNumberString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  picture?: string;

  @ApiProperty({ example: 'Bel appartement en centre-ville' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
