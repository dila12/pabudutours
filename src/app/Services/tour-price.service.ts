import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { CountryService } from './country.service';

@Injectable({ providedIn: 'root' })
export class TourPriceService {
  /** Cached per-country map of filecode → price for 2 travelers. */
  private readonly indexCache = new Map<string, Promise<Record<string, number>>>();

  constructor(
    private readonly http: HttpClient,
    private readonly countryService: CountryService,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {}

  /** Load for-2-travelers price without requesting missing country files. */
  async loadPrice(filecode: string, countryHint?: string): Promise<number> {
    if (!filecode || !isPlatformBrowser(this.platformId)) {
      return 0;
    }

    const country = this.countryService.toPricingCountry(
      countryHint || (await this.countryService.detectCountry()),
    );

    const index = await this.loadPriceIndex(country);
    if (typeof index[filecode] === 'number') {
      return index[filecode];
    }

    // Fallback for tours not yet in the index
    const data = await this.loadTourPriceFile(filecode, country);
    return data?.price?.['2'] ?? 0;
  }

  /** Full price JSON (title, duration, price map, etc.). */
  async loadTourPriceFile(
    filecode: string,
    countryHint?: string,
  ): Promise<any | null> {
    if (!filecode || !isPlatformBrowser(this.platformId)) {
      return null;
    }

    const country = this.countryService.toPricingCountry(
      countryHint || (await this.countryService.detectCountry()),
    );
    const path = `assets/data/${country}${filecode}.json`;

    try {
      return await firstValueFrom(this.http.get(path));
    } catch {
      if (country !== 'US') {
        try {
          return await firstValueFrom(
            this.http.get(`assets/data/US${filecode}.json`),
          );
        } catch {
          return null;
        }
      }
      return null;
    }
  }

  /** One request covers every tour card on the home page. */
  private loadPriceIndex(country: string): Promise<Record<string, number>> {
    const key = country || 'US';
    let pending = this.indexCache.get(key);
    if (!pending) {
      pending = firstValueFrom(
        this.http.get<Record<string, number>>(`assets/data/${key}-prices.json`),
      ).catch(() => ({} as Record<string, number>));
      this.indexCache.set(key, pending);
    }
    return pending;
  }
}
