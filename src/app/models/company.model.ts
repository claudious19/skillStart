import { AppTimestamp } from './app-timestamp.type';
import { ReviewStatus } from './review-status.type';

export interface Company {
  companyId: string;
  companyName: string;
  description: string;
  location: string;
  reviewStatus: ReviewStatus;
  createdBy: string;
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
}
