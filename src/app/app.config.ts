import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { calendarEventReducer } from './store/calendar-event/calendar-event.reducer';
import { versionReducer } from './store/version/version.reducer';
import { localStorageMetaReducer, initializeStateFromStorage } from './store/local-storage.meta-reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAnimations(),
    provideStore(
      { birthday: calendarEventReducer, version: versionReducer },
      {
        metaReducers: [localStorageMetaReducer],
        initialState: initializeStateFromStorage()
      }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};
