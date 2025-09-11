import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { BASE_URL_INJECTION_TOKEN } from '@shared/injection-tokens/base-url.injection-token';

import { routes } from './app.routes';

const BASE_URL = 'http://localhost:3000/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: BASE_URL_INJECTION_TOKEN,
      useValue: BASE_URL,
    },
  ],
};
