import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login-page/login-page.component').then((module) => module.LoginPageComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register-page/register-page.component').then((module) => module.RegisterPageComponent),
  },
  {
    path: 'register/candidate',
    loadComponent: () =>
      import('./components/candidate-register-page/candidate-register-page.component').then(
        (module) => module.CandidateRegisterPageComponent,
      ),
  },
  {
    path: 'register/company',
    loadComponent: () =>
      import('./components/company-register-page/company-register-page.component').then(
        (module) => module.CompanyRegisterPageComponent,
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./components/reset-password-page/reset-password-page.component').then(
        (module) => module.ResetPasswordPageComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
