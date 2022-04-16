import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthLoginDto, AuthSignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  public async signUp(dto: AuthSignUpDto) {
    try {
      const hash: string = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          roleId: dto.roleId,
          hash,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already taken !');
        }
      }

      throw error;
    }
  }

  public async login(dto: AuthLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Email or password incorrect !');
    }

    const passwordMatched = await argon.verify(user.hash, dto.password);

    if (!passwordMatched) {
      throw new ForbiddenException('Email or password incorrect !');
    }

    return this.signToken(user.id, user.roleId, user.email);
  }

  private async signToken(id: number, roleId: number, email: string) {
    const data = {
      id,
      roleId,
      email,
    };

    const token = await this.jwt.sign(data, {
      expiresIn: '15m',
      secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
    });

    return {
      accessToken: token,
    };
  }
}
