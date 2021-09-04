export interface User {
  id: number,
  firstName: string;
  lastName?: string;
  avatar?: string;
  phoneNumber: string;
  telegramId: string;
  permission: Permission;
}

export enum Permission {
  Guest = 0,
  User = 1 << 0,
  Agent = 1 << 1,
  Admin = 1 << 2,
  SuperAdmin = 1 << 3,
}
