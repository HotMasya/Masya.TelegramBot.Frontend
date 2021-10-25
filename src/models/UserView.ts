import { Permission } from './User';

export interface UserView {
  id: number;
  agencyId?: number;
  permission: Permission;
  telegramAccountId: number;
  telegramLogin: string;
  telegramAvatar: string;
  telegramFirstName: string;
  telegramLastName?: string;
  telegramPhoneNumber: string;
  lastCalledAt?: Date;
  isBlocked: boolean;
  blockReason?: string;
  isBlockedByBot?: boolean;
  isIgnored: boolean;
  note: string;
}
