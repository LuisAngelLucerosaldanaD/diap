import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";

export const permissionGuard: CanActivateFn = (route) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const roles: number[] = route.data['role'];

  if (roles.includes(_authService.getRole())) return true;

  _router.navigate(['/admin/postulations']);
  return false;
};
