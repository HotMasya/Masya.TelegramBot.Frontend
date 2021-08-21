import { Permission } from '../models/User';

export const mapPermission = (permission: Permission) => {
  switch (permission) {
    case Permission.SuperAdmin:
      return 'Super admin';

    case Permission.Admin:
      return 'Admin';

    case Permission.Agent:
      return 'Agent';

    case Permission.User:
      return 'User';

    default:
      return 'Anybody';
  }
};
