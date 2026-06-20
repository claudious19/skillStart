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
<<<<<<< HEAD
    loadComponent: () =>
      import('./company-profile-page.component').then((module) => module.CompanyProfilePageComponent),
=======
    loadComponent: loadCompanyProfile,
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960
  },
];