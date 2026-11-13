import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString, Min } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  rental_id: number;

  @ApiProperty({
    example: 'Bonjour, votre appartement est-il toujours disponible ?',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
