import { AppTimestamp } from './app-timestamp.type';

export interface JobApplication {
  candidateId: string;
  companyId: string;
  jobPostId: string;
  status: 'submitted' | 'viewed' | 'rejected' | 'invited' | 'withdrawn';
  message?: string;
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
}
