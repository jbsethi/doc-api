import { Module } from '@nestjs/common';
import { RoleController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RoleController],
  providers: [RolesService],
})
export class RolesModule {}
