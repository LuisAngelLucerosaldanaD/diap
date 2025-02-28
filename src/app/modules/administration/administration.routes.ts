import {Routes} from "@angular/router";
import {permissionGuard} from "../../core/guards/permission.guard";

export const AdminRoutes: Routes = [
  {
    path: 'users',
    data: {role: [1]},
    canActivate: [permissionGuard],
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'postulations',
    loadComponent: () => import('./pages/postulations/postulations.component').then(m => m.PostulationsComponent)
  },
  {
    path: 'exams',
    data: {role: [1]},
    canActivate: [permissionGuard],
    loadComponent: () => import('./pages/exams/exams.component').then(m => m.ExamsComponent)
  },
  {
    path: 'statistics/:id',
    data: {role: [1]},
    canActivate: [permissionGuard],
    loadComponent: () => import('./pages/statistics/statistics.component').then(m => m.StatisticsComponent)
  },
  {
    path: 'faculties',
    data: {role: [1]},
    canActivate: [permissionGuard],
    loadComponent: () => import('./pages/faculties/faculties.component').then(m => m.FacultiesComponent)
  },
  {
    path: 'settings',
    data: {role: [1]},
    canActivate: [permissionGuard],
    loadComponent: () => import('./pages/settings-portal/settings-portal.component').then(m => m.SettingsPortalComponent)
  },
  {
    path: '**',
    redirectTo: 'postulations',
    pathMatch: 'full'
  }
];
