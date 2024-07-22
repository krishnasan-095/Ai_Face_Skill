import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), { provide: LocationStrategy, useClass: HashLocationStrategy },
  importProvidersFrom(HttpClientModule),
    ServiceService, provideAnimationsAsync()]
};
