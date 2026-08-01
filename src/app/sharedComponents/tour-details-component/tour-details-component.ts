import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges,
  Type,
} from '@angular/core';
import { Router } from '@angular/router';

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
  tourType?: string;
  overview?: string;
  itinerary?: ItineraryDay[];
  includes?: string[];
  excludes?: string[];
}

@Component({
  selector: 'app-tour-details-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-details-component.html',
  styleUrl: './tour-details-component.css',
})
export class TourDetailsComponent implements OnChanges, OnDestroy {
  @Input() tour!: TourDetails;

  expandedDays: { [key: number]: boolean } = {};
  static PackageItemComponent: readonly any[] | Type<any>;

  selectedImage: string | null = null;
  private jsonLdEl: HTMLScriptElement | null = null;
  private readonly isBrowser: boolean;

  constructor(
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tour'] && this.tour) {
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

  private upsertTourJsonLd(): void {
    if (!this.isBrowser || !this.tour?.title) return;

    const path = this.router.url.split('?')[0] || '/';
    const pageUrl = `https://www.pabudutours.com${path}`;
    const price = Number(this.tour.price) || 0;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: this.tour.title,
      description:
        this.tour.overview ||
        this.tour.description ||
        `${this.tour.title} with Pabudu Tours Sri Lanka`,
      brand: {
        '@type': 'TravelAgency',
        name: 'Pabudu Tours Sri Lanka',
        url: 'https://www.pabudutours.com/',
      },
      category: this.tour.tourType || 'Tour',
      url: pageUrl,
      offers: {
        '@type': 'Offer',
        url: pageUrl,
        priceCurrency: 'USD',
        price: price > 0 ? String(price) : undefined,
        availability: 'https://schema.org/InStock',
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

  private removeTourJsonLd(): void {
    if (this.jsonLdEl?.parentNode) {
      this.jsonLdEl.parentNode.removeChild(this.jsonLdEl);
    }
    this.jsonLdEl = null;
  }
}
