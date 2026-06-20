import { AccountStatus } from './account-status.type';
import { AppTimestamp } from './app-timestamp.type';
import { UserRole } from './user-role.type';

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  companyId: string | null;
  CompanyDisplayname: string | null;
  displayName: string;
  firstName?: string;
  lastName?: string;
  accountStatus: AccountStatus;
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
}
