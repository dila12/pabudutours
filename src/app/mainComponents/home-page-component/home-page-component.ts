import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import toursData from '../../databaseJson/tours.json';
import { PackageItemComponent } from '../../sharedComponents/package-item-component/package-item-component';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactUsComponent } from '../../sharedComponents/contact-us-component/contact-us-component';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../Services/country.service';
import { TourPriceService } from '../../Services/tour-price.service';

@Component({
  selector: 'app-home-page-component',
  standalone: true,
  imports: [
    CommonModule,
    PackageItemComponent,
    RouterModule,
    ContactUsComponent,
    TranslatePipe,
  ],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.css',
})
export class HomePageComponent implements OnInit, OnDestroy {
  homecontact = true;
  dayTours: any[] = [];
  multiDayTours: any[] = [];
  currentIndex = 0;
  interval: ReturnType<typeof setInterval> | null = null;
  userCountry = 'US';
  activeTab: 'multi' | 'day' = 'multi';
  private jsonLdEl: HTMLScriptElement | null = null;

  /** Public review profile links replace googleReviewsUrl with your Business Profile link */
  tripadvisorReviewsUrl =
    'https://www.tripadvisor.com/Attraction_Review-g304136-d34261425-Reviews-Pabudu_Tours-Kalutara_Western_Province.html';
  googleReviewsUrl = 'https://share.google/ZUplfSNRQT7GHlgMn';

  reviews = [
    {
      name: 'Sri Lanka With Roshan',
      date: 'April 28, 2025',
      comment:
        'We had a really wonderful time in Sri Lanka. We booked just the car with driver and made our own hotel bookings. The tour was quite in that it was...',
      photo: 'assets/img/testimonial-1.jpg',
      profession: 'XCOUNTRYTO',
      rating: 5,
    },
    {
      name: 'Unforgettable Experience!',
      date: 'April 28, 2025',
      comment:
        'Excellent trip with amazing and safe driver Roshan! We loved the landscape, the friendly people and the delicious...',
      photo: 'assets/img/testimonial-2.jpg',
      profession: 'JEN2SG',
      rating: 5,
    },
    {
      name: 'Wonderful Travel Experience',
      date: 'April 28, 2025',
      comment:
        'We are two Italian friends, we spent 10 days exploring Sri Lanka. Our driver, Kumara, was incredibly kind and professional...',
      photo: 'assets/img/testimonial-3.jpg',
      profession: 'MICHELA R',
      rating: 5,
    },
    {
      name: 'Family With Little Ones In Sri Lanka',
      date: 'April 27, 2025',
      comment:
        'We had Dhana as our driver for days and he was instrumental in us having a lovely holiday! Everything with the company was super easy...',
      photo: 'assets/img/testimonial-4.jpg',
      profession: 'JOANA V',
      rating: 5,
    },
  ];

  constructor(
    private http: HttpClient,
    private countryService: CountryService,
    private tourPriceService: TourPriceService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  async ngOnInit() {
    this.injectStructuredData();

    const isBrowser = isPlatformBrowser(this.platformId);
    if (!isBrowser) {
      this.userCountry = 'US';
      this.dayTours = toursData.dayTours.slice(0, 3);
      this.multiDayTours = toursData.multiDayTours.slice(0, 3);
      return;
    }

    try {
      this.userCountry = await this.countryService.detectCountry();
      this.dayTours = await this.loadToursWithPrices(toursData.dayTours);
      this.multiDayTours = await this.loadToursWithPrices(
        toursData.multiDayTours,
      );
      this.autoSlide();
    } catch (error) {
      console.error('Browser data load failed:', error);
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.jsonLdEl) {
      this.renderer.removeChild(this.document.head, this.jsonLdEl);
      this.jsonLdEl = null;
    }
  }

  private injectStructuredData() {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'Pabudu Tours Sri Lanka',
      url: 'https://www.pabudutours.com/',
      logo: 'https://www.pabudutours.com/assets/img/logos/2.png',
      image: 'https://www.pabudutours.com/assets/img/mainpage/hero.webp',
      description:
        'Private and tailor-made Sri Lanka tours with experienced local chauffeur guides.',
      telephone: '+94779008803',
      email: 'Pabudutour@gmail.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No: 439/2 Managala Rd, Kuda Waskaduwa, Waskaduwa',
        addressLocality: 'Kalutara',
        addressCountry: 'LK',
      },
      areaServed: 'Sri Lanka',
      sameAs: [
        'https://www.instagram.com/Pabudutourssr',
        'https://www.tripadvisor.com/Attraction_Review-g304136-d34261425-Reviews-Pabudu_Tours-Kalutara_Western_Province.html',
      ],
    };

    this.jsonLdEl = this.renderer.createElement('script');
    this.renderer.setAttribute(this.jsonLdEl, 'type', 'application/ld+json');
    this.renderer.setAttribute(this.jsonLdEl, 'id', 'pabudu-travel-agency-ld');
    this.renderer.setProperty(this.jsonLdEl, 'text', JSON.stringify(data));
    this.renderer.appendChild(this.document.head, this.jsonLdEl);
  }

  setTab(tab: 'multi' | 'day') {
    this.activeTab = tab;
  }

  async loadToursWithPrices(tours: any[]) {
    return Promise.all(
      tours.map(async (tour) => {
        const price = await this.loadPrice(tour.filecode);
        return { ...tour, price };
      }),
    );
  }

  loadPrice(filecode: string): Promise<number> {
    return this.tourPriceService.loadPrice(filecode, this.userCountry);
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  autoSlide() {
    this.interval = setInterval(() => {
      this.next();
    }, 6000);
  }

  scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
