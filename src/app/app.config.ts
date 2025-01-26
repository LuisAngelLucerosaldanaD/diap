import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {sessionInterceptor} from "./core/services/interceptors/session.interceptor";
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(withInterceptors([sessionInterceptor])), provideStore()]
};
