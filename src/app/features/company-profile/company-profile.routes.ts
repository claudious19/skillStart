import { Routes } from '@angular/router';

export const COMPANY_PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../shared/components/feature-placeholder-page/feature-placeholder-page.component').then(
        (module) => module.FeaturePlaceholderPageComponent,
      ),
    data: {
      section: 'Company Profile',
      title: 'Unternehmensprofil',
      description:
        'Die Profilroute fuer Unternehmen ist vorbereitet. Eingabefelder, Review-Workflow und Firestore-Anbindung folgen spaeter.',
    },
  },
];
