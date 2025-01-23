import {Routes} from '@angular/router';
import {sessionGuard} from "./core/guards/session.guard";

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
    canActivate: [sessionGuard],
    loadComponent: () => import('./modules/administration/administration.component').then(m => m.AdministrationComponent),
    loadChildren: () => import('./modules/administration/administration.routes').then(m => m.AdminRoutes)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
