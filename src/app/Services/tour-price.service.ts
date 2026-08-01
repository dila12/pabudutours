import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { CountryService } from './country.service';

@Injectable({ providedIn: 'root' })
export class TourPriceService {
  constructor(
    private readonly http: HttpClient,
    private readonly countryService: CountryService,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {}

  /** Load for-2-travelers price without requesting missing country files. */
  async loadPrice(filecode: string, countryHint?: string): Promise<number> {
    const data = await this.loadTourPriceFile(filecode, countryHint);
    return data?.price?.['2'] ?? 0;
  }

  /** Full price JSON (title, duration, price map, etc.). */
  async loadTourPriceFile(filecode: string, countryHint?: string): Promise<any | null> {
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
      // Safety net only if a new pricing country is added but a file is missing
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
}
