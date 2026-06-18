import { Timestamp } from 'firebase/firestore';

import { AccountStatus } from './account-status.type';
import { UserRole } from './user-role.type';

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
