import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AuthRoutes)
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent),
    loadChildren: () => import('./modules/home/home.routing').then(m => m.HomeRouting)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
