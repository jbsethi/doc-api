import { AuthPermission } from 'src/auth/permission';
import { RolesPermission } from 'src/roles/permission';
import { PermissionsPermission } from 'src/permission/permission';

export const Permission = {
  ...RolesPermission,
  ...AuthPermission,
  ...PermissionsPermission,
};

export const GroupPermissions = {
  Auth: AuthPermission,
  Roles: RolesPermission,
  Permissions: PermissionsPermission,
};

export type IPermission =
  | RolesPermission
  | PermissionsPermission
  | AuthPermission;
