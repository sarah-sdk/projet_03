import { compare, hash } from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { AuthenticatedUser } from './types/authenticated-user.type.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  #generateToken(user: AuthenticatedUser) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Cette adresse e-mail est déjà utilisée');
    }

    const hashedPassword = await hash(registerDto.password, 12);

    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
    });

    const { id, email, name } = user;

    return this.#generateToken({ id, email, name });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isSamePassword = await compare(password, user.password);

    if (!isSamePassword) {
      return null;
    }

    const { id, email: userEmail, name } = user;
    return {
      id,
      email: userEmail,
      name,
    };
  }

  async login(user: AuthenticatedUser) {
    return this.#generateToken(user);
  }
}
