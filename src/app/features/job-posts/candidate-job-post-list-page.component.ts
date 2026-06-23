import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { JobPostService } from '../../core/services/job-post.service';
import { EmploymentType, JobPost } from '../../models';

type CandidateJobSort = 'newest' | 'salary_high' | 'salary_low';

@Component({
  selector: 'app-candidate-job-post-list-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './candidate-job-post-list-page.component.html',
  styleUrl: './job-posts-page.shared.css',
})
export class CandidateJobPostListPageComponent implements OnInit {
  private readonly jobPostService = inject(JobPostService);

  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly searchTerm = signal('');
  readonly locationFilter = signal('all');
  readonly employmentTypeFilter = signal<'all' | EmploymentType>('all');
  readonly apprenticeshipProfessionFilter = signal('all');
  readonly sortBy = signal<CandidateJobSort>('newest');
  readonly jobPosts = signal<JobPost[]>([]);

  readonly locationOptions = computed(() =>
    this.getUniqueOptions(this.jobPosts().map((jobPost) => jobPost.location)),
  );

  readonly apprenticeshipProfessionOptions = computed(() =>
    this.getUniqueOptions(
      this.jobPosts().flatMap((jobPost) => jobPost.apprenticeshipProfessions),
    ),
  );

  readonly filteredJobPosts = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();
    const locationFilter = this.locationFilter();
    const employmentTypeFilter = this.employmentTypeFilter();
    const apprenticeshipProfessionFilter = this.apprenticeshipProfessionFilter();

    const filtered = this.jobPosts().filter((jobPost) => {
      const matchesSearch =
        searchTerm.length === 0 ||
        [
          jobPost.title,
          jobPost.companyDisplayNameSnapshot,
          jobPost.location,
          jobPost.description,
          jobPost.apprenticeshipProfessions.join(' '),
          jobPost.requiredSkills.join(' '),
          jobPost.desiredSkills.join(' '),
        ]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm);

      const matchesLocation =
        locationFilter === 'all' || jobPost.location.toLowerCase() === locationFilter.toLowerCase();
      const matchesEmploymentType =
        employmentTypeFilter === 'all' || jobPost.employmentType === employmentTypeFilter;
      const matchesProfession =
        apprenticeshipProfessionFilter === 'all' ||
        jobPost.apprenticeshipProfessions.some(
          (profession) =>
            profession.toLowerCase() === apprenticeshipProfessionFilter.toLowerCase(),
        );

      return matchesSearch && matchesLocation && matchesEmploymentType && matchesProfession;
    });

    return filtered
      .filter((jobPost) => !this.isExpired(jobPost.expiresAt))
      .sort((left, right) => this.compareJobPosts(left, right, this.sortBy()));
  });

  readonly activeFilterCount = computed(() => {
    let count = 0;
    if (this.searchTerm().trim().length > 0) {
      count += 1;
    }
    if (this.locationFilter() !== 'all') {
      count += 1;
    }
    if (this.employmentTypeFilter() !== 'all') {
      count += 1;
    }
    if (this.apprenticeshipProfessionFilter() !== 'all') {
      count += 1;
    }
    if (this.sortBy() !== 'newest') {
      count += 1;
    }
    return count;
  });

  async ngOnInit(): Promise<void> {
    void this.loadPublishedJobPosts();
  }

  updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  updateLocationFilter(value: string): void {
    this.locationFilter.set(value);
  }

  updateEmploymentTypeFilter(value: string): void {
    this.employmentTypeFilter.set(value as 'all' | EmploymentType);
  }

  updateApprenticeshipProfessionFilter(value: string): void {
    this.apprenticeshipProfessionFilter.set(value);
  }

  updateSortBy(value: string): void {
    this.sortBy.set(value as CandidateJobSort);
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.locationFilter.set('all');
    this.employmentTypeFilter.set('all');
    this.apprenticeshipProfessionFilter.set('all');
    this.sortBy.set('newest');
  }

  getEmploymentTypeLabel(value: EmploymentType): string {
    switch (value) {
      case 'part_time':
        return 'Teilzeit';
      case 'internship':
        return 'Praktikum';
      case 'temporary':
        return 'Befristet';
      case 'other':
        return 'Andere Form';
      default:
        return 'Vollzeit';
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

  isExpired(value: unknown): boolean {
    const date = this.toDate(value);
    return date ? date.getTime() < Date.now() : false;
  }

  private async loadPublishedJobPosts(): Promise<void> {
    try {
      this.jobPosts.set(await this.jobPostService.listPublishedJobPosts({ pageSize: 60 }));
    } catch {
      this.errorMessage.set(
        'Die veröffentlichten Inserate konnten im Moment nicht geladen werden.',
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  private compareJobPosts(left: JobPost, right: JobPost, sortBy: CandidateJobSort): number {
    switch (sortBy) {
      case 'salary_high':
        return right.salaryMax - left.salaryMax;
      case 'salary_low':
        return left.salaryMin - right.salaryMin;
      default:
        return this.getTimeValue(right.publishedAt) - this.getTimeValue(left.publishedAt);
    }
  }

  private getTimeValue(value: unknown): number {
    return this.toDate(value)?.getTime() ?? 0;
  }

  private getUniqueOptions(values: string[]): string[] {
    return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort((left, right) =>
      left.localeCompare(right, 'de-CH'),
    );
  }
}
