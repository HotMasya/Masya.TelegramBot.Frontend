export interface Agent {
  telegramLogin: string;
  telegramAvatar?: string;
  telegramFirstName: string;
  telegramLastName?: string;
  telegramPhoneNumber: string;
  isBlocked: boolean;
  blockReason: boolean;
  isBlockedByBot?: boolean;
  isIgnored: boolean;
  note?: string;
}
