import { Routes } from '@angular/router';

export const CANDIDATE_JOB_POST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./candidate-job-post-list-page.component').then(
        (module) => module.CandidateJobPostListPageComponent,
      ),
  },
];

export const COMPANY_JOB_POST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./company-job-post-list-page.component').then(
        (module) => module.CompanyJobPostListPageComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./company-job-post-form-page.component').then(
        (module) => module.CompanyJobPostFormPageComponent,
      ),
  },
  {
    path: ':jobPostId/edit',
    loadComponent: () =>
      import('./company-job-post-form-page.component').then(
        (module) => module.CompanyJobPostFormPageComponent,
      ),
  },
];
