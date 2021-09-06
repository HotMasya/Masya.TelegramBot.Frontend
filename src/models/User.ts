import { Agency } from "./Agency";

export interface User {
  id: number;
  telegramFirstName: string;
  telegramLastName?: string;
  telegramAvatar?: string;
  telegramPhoneNumber: string;
  telegramId: string;
  permission: Permission;
  agencyName?: string;
}

export enum Permission {
  Guest = 0,
  User = 1 << 0,
  Agent = 1 << 1,
  Admin = 1 << 2,
  SuperAdmin = 1 << 3,
}
