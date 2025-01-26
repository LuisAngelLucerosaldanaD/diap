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
    loadComponent: () => import('./pages/exams/exams.component').then(m => m.ExamsComponent)
  },
  {
    path: '**',
    redirectTo: 'postulations',
    pathMatch: 'full'
  }
];
