import { Permission } from './User';

export interface Command {
  id: number;
  name: string;
  isEnabled: boolean;
  displayInMenu: boolean;
  permission: Permission;
  parentId?: number;
}
