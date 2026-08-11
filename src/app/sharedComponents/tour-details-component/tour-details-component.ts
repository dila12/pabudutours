import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Type,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TourI18nPipe } from '../../shared/pipes/tour-i18n.pipe';
import usPrices from '../../../assets/data/US-prices.json';

/** From-2-travelers catalog used when live price has not loaded (SSR/prerender). */
const CATALOG_PRICES = usPrices as Record<string, number>;

export interface Activity {
  type: string;
  title: title;
  description?: string;
  icon?: string;
  image?: string;
  extra?: string[];
}

export interface title {
  title?: string;
  icon?: string;
  color?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: Activity[];
}

export interface TourDetails {
  title: string;
  description: string;
  duration: string;
  persons: string;
  price: number;
  filecode?: string;
  tourType?: string;
  overview?: string;
  image?: string;
  itinerary?: ItineraryDay[];
  includes?: string[];
  excludes?: string[];
}

@Component({
  selector: 'app-tour-details-component',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TourI18nPipe],
  templateUrl: './tour-details-component.html',
  styleUrl: './tour-details-component.css',
})
export class TourDetailsComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() tour!: TourDetails;
  /** Absolute or site-relative tour image used for Product JSON-LD */
  @Input() image = '';

  expandedDays: { [key: number]: boolean } = {};
  static PackageItemComponent: readonly any[] | Type<any>;

  selectedImage: string | null = null;
  private jsonLdEl: HTMLScriptElement | null = null;
  private readonly siteOrigin = 'https://www.pabudutours.com';

  constructor(
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['tour'] || changes['image']) && this.tour) {
      this.upsertTourJsonLd();
    }
  }

  ngAfterViewInit(): void {
    if (this.tour) {
      this.upsertTourJsonLd();
    }
  }

  ngOnDestroy(): void {
    this.removeTourJsonLd();
  }

  toggleDay(day: number) {
    const isAlreadyOpen = this.expandedDays[day];
    this.expandedDays = {};
    if (!isAlreadyOpen) {
      this.expandedDays[day] = true;
    }
  }

  openImage(img: string) {
    this.selectedImage = img;
  }

  closeImage() {
    this.selectedImage = null;
  }

  /** Visible + schema price. Catalog fills the prerender gap before HTTP prices load. */
  get displayPrice(): number {
    return this.resolveOfferPrice();
  }

  private upsertTourJsonLd(): void {
    if (!this.tour?.title) return;

    const path = this.router.url.split('?')[0] || '/';
    const pageUrl = `${this.siteOrigin}${path}`;
    const price = this.resolveOfferPrice();
    if (price <= 0) {
      this.removeTourJsonLd();
      return;
    }

    const priceText = String(price);
    const imageUrls = this.collectImageUrls();

    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: this.tour.title,
      description:
        this.tour.overview ||
        this.tour.description ||
        `${this.tour.title} with Pabudu Tours Sri Lanka`,
      image: imageUrls,
      brand: {
        '@type': 'TravelAgency',
        name: 'Pabudu Tours Sri Lanka',
        url: `${this.siteOrigin}/`,
      },
      category: this.tour.tourType || 'Tour',
      url: pageUrl,
      offers: {
        '@type': 'Offer',
        url: pageUrl,
        priceCurrency: 'USD',
        price: priceText,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: priceText,
          priceCurrency: 'USD',
        },
        category: this.tour.duration || undefined,
      },
    };

    if (!this.jsonLdEl) {
      this.jsonLdEl = this.document.createElement('script');
      this.jsonLdEl.type = 'application/ld+json';
      this.jsonLdEl.setAttribute('data-tour-jsonld', 'true');
      this.document.head.appendChild(this.jsonLdEl);
    }
    this.jsonLdEl.text = JSON.stringify(schema);
  }

  private resolveOfferPrice(): number {
    const live = Number(this.tour?.price);
    if (Number.isFinite(live) && live > 0) {
      return live;
    }

    const filecode = this.tour?.filecode?.trim();
    if (!filecode) {
      return 0;
    }

    const catalog = CATALOG_PRICES[filecode];
    return typeof catalog === 'number' && catalog > 0 ? catalog : 0;
  }

  private collectImageUrls(): string[] {
    const urls: string[] = [];
    const add = (raw?: string) => {
      const abs = this.toAbsoluteUrl(raw);
      if (abs && !urls.includes(abs)) {
        urls.push(abs);
      }
    };

    add(this.image);
    add(this.tour?.image);
    for (const day of this.tour?.itinerary || []) {
      for (const activity of day.activities || []) {
        add(activity.image);
      }
    }

    if (!urls.length) {
      add(`${this.siteOrigin}/assets/img/mainpage/hero.webp`);
    }

    return urls.slice(0, 8);
  }

  private toAbsoluteUrl(raw?: string): string | null {
    if (!raw?.trim()) return null;
    if (/^https?:\/\//i.test(raw)) return raw.trim();
    const normalized = raw.startsWith('/') ? raw : `/${raw}`;
    return `${this.siteOrigin}${normalized}`;
  }

  private removeTourJsonLd(): void {
    if (this.jsonLdEl?.parentNode) {
      this.jsonLdEl.parentNode.removeChild(this.jsonLdEl);
    }
    this.jsonLdEl = null;
  }
}
