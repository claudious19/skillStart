import { Routes } from '@angular/router';

export const CANDIDATE_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./candidate-profile-page.component').then(
        (m) => m.CandidateProfilePageComponent
      ),
  },
];

export const CANDIDATE_PROFILE_ROUTES: Routes = CANDIDATE_DASHBOARD_ROUTES;

export const CANDIDATE_APPLICATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./candidate-profile-page.component').then(
        (m) => m.CandidateProfilePageComponent
      ),
  },
];
