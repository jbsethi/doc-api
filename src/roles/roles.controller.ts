import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { PermissionGuard } from 'src/auth/guard';
import { JwtAuth } from 'src/auth/guard/jwt-auth.guard';
import { Permission } from 'src/permission/const';

import { CreateRoleDto } from './dto';
import { RolesService } from './roles.service';

@UseGuards(JwtAuth)
@Controller('roles')
export class RoleController {
  constructor(private service: RolesService) {}

  @Get()
  @UseGuards(PermissionGuard(Permission.GetAllRole))
  getAll() {
    return this.service.getAll();
  }

  @Post()
  @UseGuards(PermissionGuard(Permission.CreateRole))
  create(@Body() body: CreateRoleDto) {
    return this.service.create(body);
  }
}
