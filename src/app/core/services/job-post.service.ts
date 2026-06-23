import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { FIRESTORE_COLLECTIONS } from '../../firebase/firestore.collections';
import { AppUser, EmploymentType, JobPost, JobPostStatus } from '../../models';
import { FirestoreCollectionService } from './firestore-collection.service';

export interface JobPostFormValue {
  title: string;
  description: string;
  location: string;
  employmentType: EmploymentType;
  apprenticeshipProfessions: string[];
  requiredSkills: string[];
  desiredSkills: string[];
  salaryMin: number;
  salaryMax: number;
  expiresAt: Date;
}

export interface CompanyJobPostQueryOptions {
  pageSize?: number;
}

export interface PublishedJobPostQueryOptions {
  pageSize?: number;
}

@Injectable({ providedIn: 'root' })
export class JobPostService {
  private readonly firestoreCollections = inject(FirestoreCollectionService);

  async listCompanyJobPosts(
    companyId: string,
    options: CompanyJobPostQueryOptions = {},
  ): Promise<JobPost[]> {
    const pageSize = options.pageSize ?? 25;
    const snapshot = await getDocs(
      query(
        this.firestoreCollections.collection<JobPost & DocumentData>(FIRESTORE_COLLECTIONS.jobPosts),
        where('companyId', '==', companyId),
        orderBy('updatedAt', 'desc'),
        limit(pageSize),
      ),
    );

    return snapshot.docs.map((document) => document.data() as JobPost);
  }

  async getCompanyJobPost(companyId: string, jobPostId: string): Promise<JobPost | null> {
    const snapshot = await getDoc(
      this.firestoreCollections.doc<JobPost & DocumentData>(
        FIRESTORE_COLLECTIONS.jobPosts,
        jobPostId,
      ),
    );

    if (!snapshot.exists()) {
      return null;
    }

    const jobPost = snapshot.data() as JobPost;
    return jobPost.companyId === companyId ? jobPost : null;
  }

  async listPublishedJobPosts(options: PublishedJobPostQueryOptions = {}): Promise<JobPost[]> {
    const pageSize = options.pageSize ?? 60;
    const snapshot = await getDocs(
      query(
        this.firestoreCollections.collection<JobPost & DocumentData>(FIRESTORE_COLLECTIONS.jobPosts),
        where('status', '==', 'published'),
        limit(pageSize),
      ),
    );

    return snapshot.docs
      .map((document) => document.data() as JobPost)
      .filter((jobPost) => !this.isExpired(jobPost.expiresAt));
  }

  async createJobPost(user: AppUser, value: JobPostFormValue): Promise<string> {
    const companyId = this.requireCompanyId(user);
    const now = new Date();
    const jobPostRef = this.firestoreCollections.doc<JobPost & DocumentData>(
      FIRESTORE_COLLECTIONS.jobPosts,
      this.createJobPostId(),
    );

    const jobPost: JobPost = {
      jobPostId: jobPostRef.id,
      companyId,
      companyDisplayNameSnapshot: this.getCompanyDisplayName(user),
      title: value.title,
      description: value.description,
      location: value.location,
      employmentType: value.employmentType,
      apprenticeshipProfessions: value.apprenticeshipProfessions,
      requiredSkills: value.requiredSkills,
      desiredSkills: value.desiredSkills,
      salaryMin: value.salaryMin,
      salaryMax: value.salaryMax,
      status: 'draft',
      createdBy: user.uid,
      createdAt: now,
      updatedAt: now,
      publishedAt: null,
      expiresAt: value.expiresAt,
    };

    await setDoc(jobPostRef, jobPost);
    return jobPost.jobPostId;
  }

  async updateJobPost(companyId: string, jobPostId: string, value: JobPostFormValue): Promise<void> {
    await this.requireCompanyJobPost(companyId, jobPostId);

    return updateDoc(
      this.firestoreCollections.doc<JobPost & DocumentData>(
        FIRESTORE_COLLECTIONS.jobPosts,
        jobPostId,
      ),
      {
        title: value.title,
        description: value.description,
        location: value.location,
        employmentType: value.employmentType,
        apprenticeshipProfessions: value.apprenticeshipProfessions,
        requiredSkills: value.requiredSkills,
        desiredSkills: value.desiredSkills,
        salaryMin: value.salaryMin,
        salaryMax: value.salaryMax,
        expiresAt: value.expiresAt,
        updatedAt: new Date(),
      } satisfies Partial<JobPost>,
    );
  }

  publishJobPost(companyId: string, jobPostId: string): Promise<void> {
    return this.updateStatus(companyId, jobPostId, 'published', { publishedAt: new Date() });
  }

  archiveJobPost(companyId: string, jobPostId: string): Promise<void> {
    return this.updateStatus(companyId, jobPostId, 'archived');
  }

  private async updateStatus(
    companyId: string,
    jobPostId: string,
    status: JobPostStatus,
    extra: Partial<Pick<JobPost, 'publishedAt'>> = {},
  ): Promise<void> {
    await this.requireCompanyJobPost(companyId, jobPostId);

    return updateDoc(
      this.firestoreCollections.doc<JobPost & DocumentData>(
        FIRESTORE_COLLECTIONS.jobPosts,
        jobPostId,
      ),
      {
        status,
        updatedAt: new Date(),
        ...extra,
      } satisfies Partial<JobPost>,
    );
  }

  private createJobPostId(): string {
    return doc(
      this.firestoreCollections.collection<JobPost & DocumentData>(FIRESTORE_COLLECTIONS.jobPosts),
    ).id;
  }

  private async requireCompanyJobPost(companyId: string, jobPostId: string): Promise<JobPost> {
    const jobPost = await this.getCompanyJobPost(companyId, jobPostId);

    if (!jobPost) {
      throw new Error('Job post does not belong to the current company.');
    }

    return jobPost;
  }

  private requireCompanyId(user: AppUser): string {
    if (!user.companyId) {
      throw new Error('Company users need a companyId to manage job posts.');
    }

    return user.companyId;
  }

  private getCompanyDisplayName(user: AppUser): string {
    return user.CompanyDisplayname?.trim() || user.displayName || user.email;
  }

  private isExpired(value: unknown): boolean {
    const date =
      value instanceof Date
        ? value
        : typeof value === 'object' && value !== null && 'toDate' in value
          ? (value as { toDate: () => Date }).toDate()
          : null;

    return date ? date.getTime() < Date.now() : false;
  }
}
