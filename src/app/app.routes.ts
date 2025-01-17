import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AuthRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.routing').then(m => m.HomeRouting)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
