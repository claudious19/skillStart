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
    loadComponent: loadPlaceholder,
    data: {
      section: 'Job Posts',
      title: 'Job-Posts verwalten',
      description:
        'Der Routing-Zweig fuer Unternehmens-Stellen steht. Erstellung, Bearbeitung und Review-Workflow folgen in den Job-Post-Prompts.',
    },
  },
  {
    path: 'new',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Job Posts',
      title: 'Neuen Job-Post erstellen',
      description:
        'Der Einstiegspunkt fuer neue Stellen ist vorbereitet und kann spaeter mit dem Qualitaetsformular verbunden werden.',
    },
  },
];
