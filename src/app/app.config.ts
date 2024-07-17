import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
  importProvidersFrom(HttpClientModule),
    ServiceService]
};
