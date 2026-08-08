import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type AppLang = 'en' | 'de' | 'ru' | 'hi';

export interface AppLanguage {
  code: AppLang;
  short: string;
  label: string;
  flag: string;
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly languages: AppLanguage[] = [
    { code: 'en', short: 'EN', label: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'de', short: 'DE', label: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
    { code: 'ru', short: 'RU', label: 'Русский', flag: 'https://flagcdn.com/w40/ru.png' },
    { code: 'hi', short: 'HI', label: 'हिन्दी', flag: 'https://flagcdn.com/w40/in.png' },
  ];

  private readonly storageKey = 'preferred_lang';

  constructor(
    private readonly translate: TranslateService,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.translate.addLangs(this.languages.map((l) => l.code));
    this.translate.setFallbackLang('en');

    const queryLang = this.readQueryLang();
    const initial = queryLang ?? this.readSavedLang() ?? 'en';
    void this.use(initial, !!queryLang);
    this.stripLangQuery();
  }

  get currentLang(): AppLang {
    const lang = this.translate.getCurrentLang() as AppLang;
    return this.isSupported(lang) ? lang : 'en';
  }

  get activeLanguage(): AppLanguage {
    return this.languages.find((l) => l.code === this.currentLang) ?? this.languages[0];
  }

  use(lang: string, persist = true): void {
    const next: AppLang = this.isSupported(lang) ? (lang as AppLang) : 'en';
    this.translate.use(next);
    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.lang = next === 'hi' ? 'hi' : next;
      if (persist) {
        localStorage.setItem(this.storageKey, next);
      }
    }
  }

  private isSupported(lang: string | null | undefined): lang is AppLang {
    return !!lang && this.languages.some((l) => l.code === lang);
  }

  private readQueryLang(): AppLang | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const lang = new URLSearchParams(this.document.defaultView?.location.search || '').get(
      'lang',
    );
    return this.isSupported(lang) ? lang : null;
  }

  private stripLangQuery(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const url = new URL(this.document.defaultView?.location.href || '');
    if (!url.searchParams.has('lang')) {
      return;
    }
    url.searchParams.delete('lang');
    const next = `${url.pathname}${url.search}${url.hash}` || '/';
    this.document.defaultView?.history.replaceState({}, '', next);
  }

  private readSavedLang(): AppLang | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const saved = localStorage.getItem(this.storageKey);
    // Drop old Google Translate codes (it, fr, es, pl, zh-CN, etc.)
    return this.isSupported(saved) ? saved : null;
  }
}
