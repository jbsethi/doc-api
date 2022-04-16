import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

import { IPermission } from 'src/permission/const';

import { JwtAuth } from './jwt-auth.guard';

export const PermissionGuard = (permission: IPermission): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuth {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      const userPermission: string[] = user?.role?.permissions?.map(
        (permission) => permission.title,
      );

      return userPermission.includes(permission);
    }
  }

  return mixin(PermissionGuardMixin);
};
