import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { publicOnlyGuard } from './core/guards/public-only.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/landing/landing.routes').then((module) => module.LANDING_ROUTES),
  },
  {
    path: 'auth',
    canMatch: [publicOnlyGuard],
    loadChildren: () =>
      import('./features/auth/auth.routes').then((module) => module.AUTH_ROUTES),
  },
  {
    path: 'candidate',
    canActivate: [authGuard, roleGuard(['candidate'])],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/candidate-profile/candidate-profile.routes').then(
            (module) => module.CANDIDATE_DASHBOARD_ROUTES,
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/candidate-profile/candidate-profile.routes').then(
            (module) => module.CANDIDATE_PROFILE_ROUTES,
          ),
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('./features/candidate-profile/candidate-profile.routes').then(
            (module) => module.CANDIDATE_APPLICATION_ROUTES,
          ),
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./features/job-posts/job-posts.routes').then(
            (module) => module.CANDIDATE_JOB_POST_ROUTES,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: 'company',
    canActivate: [authGuard, roleGuard(['company'])],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/employer-view/employer-view.routes').then(
            (module) => module.COMPANY_DASHBOARD_ROUTES,
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/company-profile/company-profile.routes').then(
            (module) => module.COMPANY_PROFILE_ROUTES,
          ),
      },
      {
        path: 'job-posts',
        loadChildren: () =>
          import('./features/job-posts/job-posts.routes').then(
            (module) => module.COMPANY_JOB_POST_ROUTES,
          ),
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('./features/employer-view/employer-view.routes').then(
            (module) => module.COMPANY_APPLICATION_ROUTES,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard(['admin'])],
    loadChildren: () =>
      import('./features/admin/admin.routes').then((module) => module.ADMIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
