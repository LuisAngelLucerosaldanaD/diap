import {ApplicationConfig} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {sessionInterceptor} from "./core/services/interceptors/session.interceptor";
import {provideStore} from '@ngrx/store';
import {appReducers} from "./core/store/app.reducers";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideAnimations(), 
    provideHttpClient(withInterceptors([sessionInterceptor]), withFetch()), 
    provideStore(appReducers)
  ]
};
