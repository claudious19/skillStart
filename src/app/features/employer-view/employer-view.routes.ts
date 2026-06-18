import { Routes } from '@angular/router';

const loadPlaceholder = () =>
  import('../../shared/components/feature-placeholder-page/feature-placeholder-page.component').then(
    (module) => module.FeaturePlaceholderPageComponent,
  );

export const COMPANY_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Company',
      title: 'Unternehmens-Dashboard',
      description:
        'Der geschuetzte Arbeitgeberbereich ist eingerichtet. Daten, Aktionen und Metriken werden in spaeteren Prompts aufgebaut.',
    },
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
