import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {catchError, throwError} from "rxjs";
import {AuthStore} from "../../store/auth.store";
import {AppStore} from "../../store/app.store";

export const sessionInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.getToken();
  const authStore = inject(AuthStore);
  const appStore = inject(AppStore);

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(req).pipe(catchError((err: HttpErrorResponse) => {
    if (err.status === 401) {
      authService.logout();
      authStore.logout();
      appStore.setHomeMenu();
    }
    return throwError(() => err);
  }));
};
