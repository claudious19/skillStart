import { Timestamp } from 'firebase/firestore';

import { ReviewStatus } from './review-status.type';

export interface CandidateProfile {
  ownerId: string;
  firstName: string;
  lastName: string;
  apprenticeshipProfession: string;
  specialisation: string;
  graduationYear: number;
  skills: string[];
  ipaProject?: string;
  personalProjects: string[];
  certificates: string[];
  githubUrl?: string;
  portfolioUrl?: string;
  location: string;
  careerGoals: string;
  desiredProfessionalFields: string[];
  reviewStatus: ReviewStatus;
  reviewComment?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
