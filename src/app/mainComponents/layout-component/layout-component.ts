import { Component, HostBinding, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ScrollToToComponent } from '../../sharedComponents/scroll-to-to-component/scroll-to-to-component';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout-component',
  standalone: true,
  imports: [CommonModule, ScrollToToComponent, RouterModule],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css',
})
export class LayoutComponent implements OnInit, OnDestroy {
  activeLang = 'en';
  langMenuOpen = false;
  currentYear = new Date().getFullYear();
  isHome = false;
  private routeSub?: Subscription;
  private documentClick?: (event: MouseEvent) => void;

  languages = [
    { code: 'en', short: 'EN', label: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'de', short: 'DE', label: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
    { code: 'it', short: 'IT', label: 'Italiano', flag: 'https://flagcdn.com/w40/it.png' },
    { code: 'fr', short: 'FR', label: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'es', short: 'ES', label: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
    { code: 'ru', short: 'RU', label: 'Русский', flag: 'https://flagcdn.com/w40/ru.png' },
    { code: 'pl', short: 'PL', label: 'Polski', flag: 'https://flagcdn.com/w40/pl.png' },
    { code: 'zh-CN', short: '中文', label: '中文', flag: 'https://flagcdn.com/w40/cn.png' },
  ];

  get activeLanguage() {
    return this.languages.find((l) => l.code === this.activeLang) ?? this.languages[0];
  }

  @HostBinding('class.layout--home')
  get homeLayout() {
    return this.isHome;
  }

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    this.isHome = this.router.url === '/' || this.router.url === '';
    this.routeSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = e.urlAfterRedirects.split('?')[0];
        this.isHome = url === '/' || url === '';
      });

    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('preferred_lang');
      if (savedLang && savedLang !== 'en') {
        this.activeLang = savedLang;
        this.applyGoogleTranslate(savedLang);
      }

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

  selectLang(lang: string, event: Event) {
    event.stopPropagation();
    this.langMenuOpen = false;
    this.changeLang(lang);
  }

  changeLang(lang: string) {
    this.activeLang = lang;
    localStorage.setItem('preferred_lang', lang);
    if (lang === 'en') {
      this.resetGoogleTranslate();
      return;
    }
    this.applyGoogleTranslate(lang);
  }

  private applyGoogleTranslate(lang: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const loadTranslate = (window as Window & {
      loadGoogleTranslate?: () => Promise<void>;
    }).loadGoogleTranslate;

    const apply = () => {
      const interval = setInterval(() => {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
          select.value = lang;
          select.dispatchEvent(new Event('change'));
          clearInterval(interval);
        }
      }, 300);
    };

    if (typeof loadTranslate === 'function') {
      void loadTranslate().then(apply);
      return;
    }

    apply();
  }

  private resetGoogleTranslate() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    document.cookie = 'googtrans=;path=/;domain=' + location.hostname;
    document.cookie = 'googtrans=;path=/';
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
