import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

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

  @Put('/:id')
  @UseGuards(PermissionGuard(Permission.UpdateRole))
  update(@Param('id') id: number, @Body() body: CreateRoleDto) {
    return this.service.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(PermissionGuard(Permission.UpdateRole))
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Delete('/:id/remove')
  @UseGuards(PermissionGuard(Permission.UpdateRole))
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
