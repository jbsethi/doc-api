import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  public getAll() {
    return this.prisma.role.findMany();
  }

  public async create(dto: CreateRoleDto) {
    try {
      const role = await this.prisma.role.create({
        data: {
          title: dto.title,
          permissions: {
            createMany: {
              data: dto.permissions.map((permission) => {
                return {
                  title: permission,
                };
              }),
            },
          },
        },
      });

      return role;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Role already exist !');
        }
      }

      throw error;
    }
  }
}
