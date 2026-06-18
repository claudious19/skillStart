import { Routes } from '@angular/router';

export const LANDING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../shared/components/feature-placeholder-page/feature-placeholder-page.component').then(
        (module) => module.FeaturePlaceholderPageComponent,
      ),
    data: {
      section: 'Prompt 1',
      title: 'SkillStart',
      description:
        'Die Angular-Grundstruktur steht. Das echte Landingpage-Layout und die Produktinszenierung folgen in Prompt 2.',
      nextStep:
        'Die App ist bereits für Routing, Firebase, PWA und GitHub Pages vorbereitet, ohne Geschäftslogik vorwegzunehmen.',
    },
  },
];
