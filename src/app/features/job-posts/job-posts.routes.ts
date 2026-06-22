import { Routes } from '@angular/router';

const loadPlaceholder = () =>
  import('../../shared/components/feature-placeholder-page/feature-placeholder-page.component').then(
    (module) => module.FeaturePlaceholderPageComponent,
  );

export const CANDIDATE_JOB_POST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Job Posts',
      title: 'Offene Stellen',
      description:
        'Die Kandidatenansicht fuer freigegebene Stellen ist vorbereitet. Filter, Cards und lokale Demo-Abfragen folgen spaeter.',
    },
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
