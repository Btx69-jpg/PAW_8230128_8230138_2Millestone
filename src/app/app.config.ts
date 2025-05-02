/**
 * Diz ao angular como ele vai renderizar os meus componentes
 * Faço a renderização das paginas, ou seja, no app.routes.ts crio as rotas que esta pagina pode aceder
 * e aqui digo como é que elas podem ser acedidas
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
};
