import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BASE_URL_INJECTION_TOKEN } from '@shared/injection-tokens/base-url.injection-token';

const BASE_URL = 'http://localhost:3000';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: BASE_URL_INJECTION_TOKEN,
      useValue: BASE_URL
    }
  ]
};
