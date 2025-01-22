import {Routes} from "@angular/router";

export const AdminRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'postulations',
    loadComponent: () => import('./pages/postulations/postulations.component').then(m => m.PostulationsComponent)
  },
  {
    path: 'exams',
    loadComponent: () => import('./pages/exams/exams.component').then(m => m.ExamsComponent)
  },
  {
    path: '**',
    redirectTo: 'postulations',
    pathMatch: 'full'
  }
];
