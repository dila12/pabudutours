import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CountryService {
  /** ISO codes that have price JSON files (e.g. USella-day-tour.json). */
  private static readonly PRICING_COUNTRIES = new Set(['US']);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /** Country code to use for price JSON filenames (always has a file). */
  toPricingCountry(countryCode: string | null | undefined): string {
    const code = String(countryCode || 'US').toUpperCase();
    return CountryService.PRICING_COUNTRIES.has(code) ? code : 'US';
  }

  async detectCountry(): Promise<string> {
    if (!isPlatformBrowser(this.platformId)) {
      return 'US';
    }

    // Only US price files exist — skip geo API on the critical path.
    if (
      CountryService.PRICING_COUNTRIES.size === 1 &&
      CountryService.PRICING_COUNTRIES.has('US')
    ) {
      localStorage.setItem('user_country', 'US');
      return 'US';
    }

    const saved = localStorage.getItem('user_country');
    if (saved) {
      const pricing = this.toPricingCountry(saved);
      if (pricing !== saved) {
        localStorage.setItem('user_country', pricing);
      }
      return pricing;
    }

    try {
      const res = await fetch('https://api.country.is/');
      const data = await res.json();
      const pricing = this.toPricingCountry(data?.country || 'US');
      localStorage.setItem('user_country', pricing);
      return pricing;
    } catch {
      localStorage.setItem('user_country', 'US');
      return 'US';
    }
  }
}
