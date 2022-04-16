import { AuthPermission } from '../../auth/permission';
import { RolesPermission } from '../../roles/permission';
import { PermissionsPermission } from '../permission';

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
