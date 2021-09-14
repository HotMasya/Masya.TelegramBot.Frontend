import { Permission } from '.';

export interface Agent {
  id: number;
  telegramLogin: string;
  telegramAvatar?: string;
  telegramFirstName: string;
  telegramLastName?: string;
  telegramPhoneNumber: string;
  permission: Permission;
  isBlocked: boolean;
  blockReason: boolean;
  isBlockedByBot?: boolean;
  isIgnored: boolean;
  note?: string;
  willBeDeleted?: boolean;
}
