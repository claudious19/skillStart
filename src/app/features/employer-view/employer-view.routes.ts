import { Routes } from '@angular/router';

const loadPlaceholder = () =>
  import('../../shared/components/feature-placeholder-page/feature-placeholder-page.component').then(
    (module) => module.FeaturePlaceholderPageComponent,
  );

export const COMPANY_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../company-profile/company-profile-page.component').then((module) => module.CompanyProfilePageComponent),
  },
];

export const COMPANY_APPLICATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Company',
      title: 'Eingehende Bewerbungen',
      description:
        'Die Bewerbungsansicht fuer Unternehmen ist im Routing vorbereitet und wartet auf die spaetere Datenlogik.',
    },
  },
];
