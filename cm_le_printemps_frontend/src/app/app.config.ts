import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    provideClientHydration(),
    JwtHelperService, 
    // provideServiceWorker('ngsw-worker.js', {
    //         enabled: !isDevMode(),
    //         registrationStrategy: 'registerWhenStable:30000'
    //       })
  ]
};
