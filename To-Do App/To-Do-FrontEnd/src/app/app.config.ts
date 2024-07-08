import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient,withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './interceptors/header.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(withInterceptors([headerInterceptor]),withFetch()),provideToastr({
    closeButton:true,positionClass:'toast-top-right',timeOut:3000,preventDuplicates:true
  }),provideAnimationsAsync()]
};export default appConfig;

