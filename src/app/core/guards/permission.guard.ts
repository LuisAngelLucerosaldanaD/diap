import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";

export const permissionGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const roles: number[] = route.data['role'];

  return roles.includes(_authService.getRole());
};
