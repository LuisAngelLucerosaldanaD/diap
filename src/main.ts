import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {fluentButton, fluentCard, fluentTextField, provideFluentDesignSystem} from "@fluentui/web-components";

provideFluentDesignSystem().register(fluentCard(), fluentButton(), fluentTextField());

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
