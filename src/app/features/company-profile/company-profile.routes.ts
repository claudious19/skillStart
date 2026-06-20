import { Routes } from '@angular/router';

const loadCompanyProfile = () =>
  import('./company-profile-page.component').then(
    (module) => module.CompanyProfilePageComponent,
  );

export const COMPANY_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: loadCompanyProfile,
  },
];

export const COMPANY_PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: loadCompanyProfile,
  },
];