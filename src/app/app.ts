import { Component, Inject } from '@angular/core';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from './Services/language.service';

const SITE_ORIGIN = 'https://www.pabudutours.com';
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/img/mainpage/hero.webp`;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterModule],
})
export class AppComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private languageService: LanguageService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    // Ensure preferred language is applied on bootstrap.
    void this.languageService.currentLang;
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        const title =
          data['title'] ||
          'Pabudu Tours Sri Lanka | Private & Tailor Made Sri Lanka Tours';
        const description =
          data['description'] ||
          'Explore Sri Lanka with private tours, tailor-made holiday packages and experienced local driver guides.';
        const ogImage = data['ogImage'] || DEFAULT_OG_IMAGE;
        const robots = data['robots'] || 'index, follow, max-image-preview:large';

        this.titleService.setTitle(title);

        this.metaService.updateTag({ name: 'description', content: description });
        this.metaService.updateTag({ name: 'robots', content: robots });

        if (data['keywords']) {
          this.metaService.updateTag({
            name: 'keywords',
            content: data['keywords'],
          });
        }

        const url = this.router.url.split('?')[0] || '/';
        const canonicalUrl = `${SITE_ORIGIN}${url === '/' ? '/' : url}`;

        // Must run during prerender too. A homepage canonical on every URL
        // makes Google treat tour pages as duplicates ("Discovered - not indexed").
        let canonical = this.document.querySelector(
          "link[rel='canonical']",
        ) as HTMLLinkElement | null;
        if (!canonical) {
          canonical = this.document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          this.document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', canonicalUrl);

        this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
        this.metaService.updateTag({ property: 'og:title', content: title });
        this.metaService.updateTag({
          property: 'og:description',
          content: description,
        });
        this.metaService.updateTag({ property: 'og:image', content: ogImage });
        this.metaService.updateTag({
          property: 'og:image:alt',
          content: title,
        });
        this.metaService.updateTag({ property: 'og:type', content: 'website' });
        this.metaService.updateTag({
          property: 'og:site_name',
          content: 'Pabudu Tours Sri Lanka',
        });

        this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.metaService.updateTag({ name: 'twitter:title', content: title });
        this.metaService.updateTag({
          name: 'twitter:description',
          content: description,
        });
        this.metaService.updateTag({ name: 'twitter:image', content: ogImage });
      });
  }
}
