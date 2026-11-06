import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Geralt de Riv',
    description: "Nom de l'utilisateur",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'geralt-de-riv@example.com',
    description: "Adresse e-mail de l'utilisateur",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'MySecurePassword123!',
    description: 'Mot de passe (8 caractères minimum)',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
