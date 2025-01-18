import {Routes} from "@angular/router";

export const HomeRouting: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/announcements/announcements.component').then(m => m.AnnouncementsComponent)
  },
  {
    path: 'applications',
    loadComponent: () => import('./pages/applications/applications.component').then(m => m.ApplicationsComponent)
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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
