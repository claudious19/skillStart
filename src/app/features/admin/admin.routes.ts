import { Routes } from '@angular/router';

const loadPlaceholder = () =>
  import('../../shared/components/feature-placeholder-page/feature-placeholder-page.component').then(
    (module) => module.FeaturePlaceholderPageComponent,
  );

export const ADMIN_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Admin',
      title: 'Admin-Dashboard',
      description:
        'Die geschuetzte Admin-Einstiegsroute ist vorbereitet. Review-Widgets und Moderationslogik folgen spaeter.',
    },
  },
  {
    path: 'candidates',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Admin',
      title: 'Kandidaten pruefen',
      description:
        'Die Admin-Route fuer Kandidaten-Reviews ist angelegt und bleibt bis zum Review-Prompt bewusst minimal.',
    },
  },
  {
    path: 'companies',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Admin',
      title: 'Unternehmen pruefen',
      description:
        'Die Moderationsroute fuer Unternehmensprofile ist vorbereitet und kann spaeter an Review-Daten angebunden werden.',
    },
  },
  {
    path: 'job-posts',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Admin',
      title: 'Job-Posts pruefen',
      description:
        'Die Admin-Ansicht fuer Stellenfreigaben ist vorhanden und wird in spaeteren Prompts funktional ausgebaut.',
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];
