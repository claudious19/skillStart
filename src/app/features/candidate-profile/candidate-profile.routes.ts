import { Routes } from '@angular/router';

const loadPlaceholder = () =>
  import('../../shared/components/feature-placeholder-page/feature-placeholder-page.component').then(
    (module) => module.FeaturePlaceholderPageComponent,
  );

export const CANDIDATE_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./candidate-profile-page.component').then((module) => module.CandidateProfilePageComponent),
  },
];

export const CANDIDATE_PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./candidate-profile-page.component').then((module) => module.CandidateProfilePageComponent),
  },
];

export const CANDIDATE_APPLICATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Candidate',
      title: 'Bewerbungen',
      description:
        'Die Bewerbungs-Route ist vorbereitet und kann spaeter an die temporaere Demo-Datenhaltung und Statuslogik angebunden werden.',
    },
  },
];
