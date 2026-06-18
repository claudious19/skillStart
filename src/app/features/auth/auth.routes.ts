import { Routes } from '@angular/router';

const loadPlaceholder = () =>
  import('../../shared/components/feature-placeholder-page/feature-placeholder-page.component').then(
    (module) => module.FeaturePlaceholderPageComponent,
  );

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Auth',
      title: 'Login',
      description:
        'Die Login-Route ist eingerichtet. Die eigentlichen Firebase-Authentifizierungsfluesse folgen in Prompt 5.',
    },
  },
  {
    path: 'register',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Auth',
      title: 'Registrierung',
      description:
        'Die Registrierungsstruktur ist vorbereitet. Kandidaten- und Unternehmens-Registrierung werden im Auth-Prompt umgesetzt.',
    },
  },
  {
    path: 'register/candidate',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Auth',
      title: 'Kandidaten-Registrierung',
      description:
        'Dieser Einstiegspunkt ist fuer den spaeteren Kandidaten-Flow reserviert und haengt bereits korrekt im Routing.',
    },
  },
  {
    path: 'register/company',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Auth',
      title: 'Unternehmens-Registrierung',
      description:
        'Dieser Einstiegspunkt ist fuer den spaeteren Company-Flow vorbereitet und bleibt bis Prompt 5 bewusst schlank.',
    },
  },
  {
    path: 'reset-password',
    loadComponent: loadPlaceholder,
    data: {
      section: 'Auth',
      title: 'Passwort zuruecksetzen',
      description:
        'Die Route fuer den Passwort-Reset ist angelegt. Das Formular und die Firebase-Integration kommen spaeter.',
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
