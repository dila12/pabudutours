import { Component, HostBinding, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollToToComponent } from '../../sharedComponents/scroll-to-to-component/scroll-to-to-component';
import { LanguageService } from '../../Services/language.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout-component',
  standalone: true,
  imports: [CommonModule, ScrollToToComponent, RouterModule, TranslatePipe],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css',
})
export class LayoutComponent implements OnInit, OnDestroy {
  langMenuOpen = false;
  navOpen = false;
  currentYear = new Date().getFullYear();
  isHome = false;
  private routeSub?: Subscription;
  private documentClick?: (event: MouseEvent) => void;

  get languages() {
    return this.languageService.languages;
  }

  get activeLang() {
    return this.languageService.currentLang;
  }

  get activeLanguage() {
    return this.languageService.activeLanguage;
  }

  @HostBinding('class.layout--home')
  get homeLayout() {
    return this.isHome;
  }

  constructor(
    private router: Router,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    this.isHome = this.router.url === '/' || this.router.url === '';
    this.routeSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = e.urlAfterRedirects.split('?')[0];
        this.isHome = url === '/' || url === '';
        this.navOpen = false;
      });

    if (isPlatformBrowser(this.platformId)) {
      this.documentClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        if (!target?.closest('.lang-dropdown')) {
          this.langMenuOpen = false;
        }
      };
      document.addEventListener('click', this.documentClick);
    }
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
    if (isPlatformBrowser(this.platformId) && this.documentClick) {
      document.removeEventListener('click', this.documentClick);
    }
  }

  toggleLangMenu(event: Event) {
    event.stopPropagation();
    this.langMenuOpen = !this.langMenuOpen;
  }

  toggleNav(event?: Event) {
    event?.stopPropagation();
    this.navOpen = !this.navOpen;
  }

  selectLang(lang: string, event: Event) {
    event.stopPropagation();
    this.langMenuOpen = false;
    this.languageService.use(lang);
  }

  openCookiePreferences() {
    if (!isPlatformBrowser(this.platformId)) return;
    const open = (window as Window & { openCookiePreferences?: () => void })
      .openCookiePreferences;
    if (typeof open === 'function') open();
  }
}
