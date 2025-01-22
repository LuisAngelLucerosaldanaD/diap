import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AuthRoutes)
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent),
    loadChildren: () => import('./modules/home/home.routes').then(m => m.HomeRoutes)
  },
  {
    path: 'admin',
    loadComponent: () => import('./modules/administration/administration.component').then(m => m.AdministrationComponent),
    loadChildren: () => import('./modules/administration/administration.routes').then(m => m.AdminRoutes)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
