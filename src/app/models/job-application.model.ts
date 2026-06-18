import { Timestamp } from 'firebase/firestore';

export interface JobApplication {
  candidateId: string;
  companyId: string;
  jobPostId: string;
  status: 'submitted' | 'viewed' | 'rejected' | 'invited' | 'withdrawn';
  message?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
