import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { persistState } from '@datorama/akita';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }),
  { provide: 'persistStorage', useValue: persistState() },
  provideAnimations(),
  ]
};
