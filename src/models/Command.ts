import { Permission } from './User';

export interface Command {
  id: number;
  name: string;
  isEnabled: boolean | null;
  displayInMenu: boolean | null;
  permission: Permission;
  aliases: Command[];
}
