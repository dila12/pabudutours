import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic booking pages stay client-rendered
  {
    path: 'booking/:filecode',
    renderMode: RenderMode.Client,
  },
  // Public marketing/tour pages are prerendered for Google indexing
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
