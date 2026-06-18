import { Timestamp } from 'firebase/firestore';

import { ReviewStatus } from './review-status.type';

export interface CompanyProfile {
  ownerId: string;
  companyName: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  websiteUrl?: string;
  location: string;
  description: string;
  reviewStatus: ReviewStatus;
  reviewComment?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
