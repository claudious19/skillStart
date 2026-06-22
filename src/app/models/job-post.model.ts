import { AppTimestamp } from './app-timestamp.type';

export type JobPostStatus = 'draft' | 'published' | 'archived';

export type EmploymentType =
  | 'full_time'
  | 'part_time'
  | 'internship'
  | 'temporary'
  | 'other';

export interface JobPost {
  jobPostId: string;
  companyId: string;
  companyDisplayNameSnapshot: string;
  title: string;
  description: string;
  location: string;
  employmentType: EmploymentType;
  apprenticeshipProfessions: string[];
  requiredSkills: string[];
  desiredSkills: string[];
  salaryMin: number;
  salaryMax: number;
  status: JobPostStatus;
  createdBy: string;
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
  publishedAt: AppTimestamp | null;
  expiresAt: AppTimestamp;
}
