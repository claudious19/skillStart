import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { JobPostService } from '../../core/services/job-post.service';
import { UserDocumentService } from '../../core/services/user-document.service';
import { AppUser, JobPost, JobPostStatus } from '../../models';

@Component({
  selector: 'app-company-job-post-list-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass, RouterLink],
  templateUrl: './company-job-post-list-page.component.html',
  styleUrl: './job-posts-page.shared.css',
})
export class CompanyJobPostListPageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userDocumentService = inject(UserDocumentService);
  private readonly jobPostService = inject(JobPostService);
  private readonly router = inject(Router);

  readonly isLoading = signal(true);
  readonly actionJobPostId = signal<string | null>(null);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly currentUser = signal<AppUser | null>(null);
  readonly jobPosts = signal<JobPost[]>([]);

  async ngOnInit(): Promise<void> {
    await this.loadJobPosts();
  }

  getStatusLabel(status: JobPostStatus): string {
    switch (status) {
      case 'published':
        return 'Veröffentlicht';
      case 'archived':
        return 'Archiviert';
      default:
        return 'Entwurf';
    }
  }

  getStatusClass(status: JobPostStatus): string {
    switch (status) {
      case 'published':
        return 'status-badge--approved';
      case 'archived':
        return 'status-badge--rejected';
      default:
        return 'status-badge--draft';
    }
  }

  toDate(value: unknown): Date | null {
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'object' && value !== null && 'toDate' in value) {
      return (value as { toDate: () => Date }).toDate();
    }

    return null;
  }

  async publish(jobPost: JobPost): Promise<void> {
    await this.runStatusAction(jobPost, 'publish');
  }

  async archive(jobPost: JobPost): Promise<void> {
    await this.runStatusAction(jobPost, 'archive');
  }

  private async loadJobPosts(): Promise<void> {
    try {
      const authUser = await this.authService.waitForAuthState();

      if (!authUser) {
        await this.router.navigateByUrl('/auth/login');
        return;
      }

      const userDoc = await this.userDocumentService.getUserDocument(authUser.uid);
      this.currentUser.set(userDoc);

      if (!userDoc?.companyId) {
        this.errorMessage.set('Deine Firma konnte nicht geladen werden.');
        return;
      }

      this.jobPosts.set(
        await this.jobPostService.listCompanyJobPosts(userDoc.companyId, { pageSize: 30 }),
      );
    } catch (error) {
      console.error('Job posts loading failed:', error);
      this.errorMessage.set('Die Inserate konnten im Moment nicht geladen werden. Prüfe Firestore Rules oder den benötigten Index in der Browser-Konsole.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private async runStatusAction(jobPost: JobPost, action: 'publish' | 'archive'): Promise<void> {
    const currentUser = this.currentUser();

    if (!currentUser?.companyId) {
      this.errorMessage.set('Deine Firma konnte nicht geladen werden.');
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');
    this.actionJobPostId.set(jobPost.jobPostId);

    try {
      if (action === 'publish') {
        await this.jobPostService.publishJobPost(currentUser.companyId, jobPost.jobPostId);
      } else {
        await this.jobPostService.archiveJobPost(currentUser.companyId, jobPost.jobPostId);
      }

      const status: JobPostStatus = action === 'publish' ? 'published' : 'archived';
      const publishedAt = action === 'publish' ? new Date() : jobPost.publishedAt;

      this.jobPosts.update((jobPosts) =>
        jobPosts.map((item) =>
          item.jobPostId === jobPost.jobPostId
            ? {
                ...item,
                status,
                publishedAt,
                updatedAt: new Date(),
              }
            : item,
        ),
      );
      this.successMessage.set(
        action === 'publish'
          ? 'Das Inserat wurde veröffentlicht.'
          : 'Das Inserat wurde archiviert.',
      );
    } catch (error) {
      console.error('Job post status update failed:', error);
      this.errorMessage.set('Die Statusänderung konnte nicht gespeichert werden. Prüfe die Browser-Konsole für Details.');
    } finally {
      this.actionJobPostId.set(null);
    }
  }
}
