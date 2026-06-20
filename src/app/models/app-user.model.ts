import { AccountStatus } from './account-status.type';
import { AppTimestamp } from './app-timestamp.type';
import { UserRole } from './user-role.type';

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
}
