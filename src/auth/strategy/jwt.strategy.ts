import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  public async validate(tokenData) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: tokenData.id,
      },
      include: {
        role: {
          include: {
            permissions: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid Access token please login again !');
    }

    return user;
  }
}
