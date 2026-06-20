import { Routes } from '@angular/router';

export const COMPANY_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./company-profile-page.component').then(
        (m) => m.CompanyProfilePageComponent
      ),
  },
];

export const COMPANY_PROFILE_ROUTES: Routes = COMPANY_DASHBOARD_ROUTES;
