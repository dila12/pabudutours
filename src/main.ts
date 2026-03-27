import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Load config and apply zoom
async function initializeApp() {
  try {
    const response = await fetch('/assets/config.json');
    const config = await response.json();
    const zoomLevel = parseFloat(config.appZoom) || 1;
    const baseFontSize = 16;
    document.documentElement.style.fontSize = `${baseFontSize * zoomLevel}px`;
  } catch (error) {
    console.warn('[Zoom] Failed to load config:', error);
  }

  return bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
      importProvidersFrom(
        BrowserModule,
        RouterModule.forRoot(routes, {
          scrollPositionRestoration: 'enabled',
          anchorScrolling: 'enabled',
        }),
        HttpClientModule,
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
          newestOnTop: true,
        }),
      ), provideClientHydration(withEventReplay()),
    ],
  });
}

initializeApp().catch(err => console.error('Bootstrap error:', err));
