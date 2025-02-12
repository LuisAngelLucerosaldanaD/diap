import {Routes} from "@angular/router";

export const HomeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/announcements/announcements.component').then(m => m.AnnouncementsComponent)
  },
  {
    path: 'faculties',
    loadComponent: () => import('./pages/faculties/faculties.component').then(m => m.FacultiesComponent)
  },
  {
    path: 'registration',
    loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent)
  },
  {
    path: 'registration/onboarding',
    loadComponent: () => import('./pages/validate-registration/validate-registration.component').then(m => m.ValidateRegistrationComponent)
  },
  {
    path: 'modalities',
    loadComponent: () => import('./pages/modalities/modalities.component').then(m => m.ModalitiesComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
