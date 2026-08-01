import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TourDetails, TourDetailsComponent } from '../../../../sharedComponents/tour-details-component/tour-details-component';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import toursData from '../../../../databaseJson/tours.json';
import { CountryService } from '../../../../Services/country.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PackageItemComponent } from '../../../../sharedComponents/package-item-component/package-item-component';
import { TourBookingSidebarComponent } from '../../../../sharedComponents/tour-booking-sidebar/tour-booking-sidebar';

@Component({
  selector: 'app-udawalawa-day-tour-component',
  standalone: true,
  imports: [CommonModule, RouterModule, TourDetailsComponent, PackageItemComponent, TourBookingSidebarComponent],
  templateUrl: './udawalawa-day-tour-component.html',
  styleUrl: './udawalawa-day-tour-component.css'
})
export class UdawalawaDayTourComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img/5daysTours/24.jpg',
    'assets/img/5daysTours/7.jpg',
    'assets/img/5daysTours/30.jpg',
    'assets/img/5daysTours/beqnuxidbmckapjcag2m.jpg',
    'assets/img/5daysTours/fozjxf01vl9yehvucwn2.jpg',
  ];

  currentIndex = 0;
  intervalId: any;
  multiDayTours: any[] = [];
  selectedTours: any[] = [];
  userCountry = 'US';
  price = 0;

  tour = {
    title: '1 Day Udawalawa Safari',
    description:
      'Private Udawalawa day tour safari with a 4–5 hour jeep safari and a visit to the Udawalawa baby elephant transit home.',
    duration: '1 Day',
    persons: '20 Persons',
    filecode: 'udawalawa-day-tour',
    overview: `1 Day Udawalawa Safari with Pabudu Tours — private air-conditioned vehicle, pickup and drop-off, multilingual local driver/guide, a 4–5 hour Udawalawa National Park safari, and the Udawalawa baby elephant transit home.`,
    tourType: 'Day Tour',

    itinerary: [
      {
        day: 1,
        title: '1 Day Udawalawa Safari',
        activities: [
          {
            type: 'Safari',
            title: {
              title: 'Udawalawa Safari',
              icon: 'fa-paw',
              color: '#27ae60',
            },
            description: '4–5 hour Udawalawa National Park jeep safari to see wild elephants and other wildlife.',
            image: 'assets/img/5daysTours/24.jpg',
          },
          {
            type: 'Wildlife',
            title: {
              title: 'Udawalawa Baby Elephant Transit',
              icon: 'fa-heart',
              color: '#e67e22',
            },
            description: 'Visit the Udawalawa baby elephant transit home and watch orphaned calves being cared for before release.',
            image: 'assets/img/5daysTours/7.jpg',
          },
        ],
      },
    ],

    includes: [
      'Air condition private vehicle with parking fee',
      'Pickup and drop off',
      'Professional and friendly local driver/guide (English / Russian / German / French / Hindi)',
      'Unlimited mineral water',
      '24 hour good service',
    ],
    excludes: [
      'Entrance and activities fees',
      'Food and drinks (alcohol / soft drinks)',
    ],
  };

  get currentImage() {
    return this.images[this.currentIndex];
  }

  get tourForDetails(): TourDetails {
    return {
      title: this.tour.title,
      description: this.tour.description,
      duration: this.tour.duration,
      persons: this.tour.persons,
      price: this.price,
      tourType: this.tour.tourType,
      overview: this.tour.overview,
      itinerary: this.tour.itinerary,
      includes: this.tour.includes,
      excludes: this.tour.excludes,
    };
  }

  get nextImages() {
    return Array.from({ length: 4 }, (_, i) => {
      const index = (this.currentIndex + i + 1) % this.images.length;
      return { src: this.images[index], index };
    });
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private countryService: CountryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }

  goToImageFromThumb(index: number) {
    this.currentIndex = index;
  }

  async ngOnInit() {
      const isBrowser = isPlatformBrowser(this.platformId);
      if (!isBrowser) {
        this.userCountry = 'US';
        this.price = 0;
        this.multiDayTours = toursData.multiDayTours.slice(0, 3);
        this.selectedTours = this.multiDayTours;
        return;
      }

      try {
        this.userCountry = await this.countryService.detectCountry();
        this.price = await this.loadPrice(this.tour.filecode);

        this.multiDayTours = await this.loadToursWithPrices(
          toursData.multiDayTours
        );

        this.selectedTours = this.multiDayTours
          .slice(0, 3);

        this.intervalId = setInterval(() => this.nextImage(), 3000);

      } catch (error) {
        console.error('Client-side loading error:', error);
      }
    }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async loadToursWithPrices(tours: any[]) {
    const isBrowser = isPlatformBrowser(this.platformId);

    if (!isBrowser) {
      return tours;
    }

    return Promise.all(
      tours.map(async (tour) => {
        const price = await this.loadPrice(tour.filecode);
        return { ...tour, price };
      })
    );
  }

  loadPrice(filecode: string): Promise<number> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve(0);
    }
    const countryFile = `assets/data/${this.userCountry}${filecode}.json`;
    const defaultFile = `assets/data/US${filecode}.json`;

    return new Promise((resolve) => {
      this.http.get(countryFile).subscribe({
        next: (data: any) => resolve(data?.price?.['2'] ?? 0),
        error: () => {
          this.http.get(defaultFile).subscribe({
            next: (data: any) => resolve(data?.price?.['2'] ?? 0),
            error: () => resolve(0)
          });
        }
      });
    });
  }

  bookNow() {
    if (!isPlatformBrowser(this.platformId)) return;
    const barcode = 'udawalawa-day-tour';
    localStorage.setItem('tour', JSON.stringify(this.tour));
    localStorage.setItem('filecode', barcode);
    localStorage.setItem('image', this.images[0]);

    this.router.navigate(['/booking', barcode], {
      state: {
        tour: this.tour,
        barcode: barcode,
        Image: this.images[0],
      },
    });
  }
}
