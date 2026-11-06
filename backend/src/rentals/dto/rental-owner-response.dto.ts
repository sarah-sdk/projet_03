import { ApiProperty } from '@nestjs/swagger';

export class RentalOwnerResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Geralt de Riv' })
  name: string;
}
