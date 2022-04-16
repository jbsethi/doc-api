import { Controller, Get, UseGuards } from '@nestjs/common';
import { PermissionGuard } from 'src/auth/guard';
import { JwtAuth } from 'src/auth/guard/jwt-auth.guard';
import { Permission, GroupPermissions } from './const';

@UseGuards(JwtAuth)
@Controller('permissions')
export class PermissionController {
  @Get()
  @UseGuards(PermissionGuard(Permission.GetAllPermission))
  getAll() {
    return GroupPermissions;
  }
}
