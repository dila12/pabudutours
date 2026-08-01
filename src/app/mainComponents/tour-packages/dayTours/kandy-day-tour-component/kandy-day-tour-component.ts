import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import {
  TourDetails,
  TourDetailsComponent,
} from '../../../../sharedComponents/tour-details-component/tour-details-component';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import toursData from '../../../../databaseJson/tours.json';
import { CountryService } from '../../../../Services/country.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PackageItemComponent } from '../../../../sharedComponents/package-item-component/package-item-component';
import { TourBookingSidebarComponent } from '../../../../sharedComponents/tour-booking-sidebar/tour-booking-sidebar';

@Component({
  selector: 'app-kandy-day-tour-component',
  imports: [
    CommonModule,
    RouterModule,
    TourDetailsComponent,
    PackageItemComponent,
    TourBookingSidebarComponent,
  ],
  templateUrl: './kandy-day-tour-component.html',
  styleUrl: './kandy-day-tour-component.css',
})
export class KandyDayTourComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img/onedayTour/kandy/1.jpg',
    'assets/img/onedayTour/kandy/2.jpg',
    'assets/img/onedayTour/kandy/3.jpg',
    'assets/img/onedayTour/kandy/4.jpg',
    'assets/img/onedayTour/kandy/5.jpg',
  ];

  currentIndex = 0;
  intervalId: any;
  multiDayTours: any[] = [];
  selectedTours: any[] = [];
  userCountry = 'US';
  price = 0;

  tour = {
    title: '1 Day Kandy Excursion',
    description:
      'Full-day private Kandy excursion covering the Temple of the Tooth or Nelligala, Peradeniya Botanical Garden, tea, elephants, Ayurveda garden and batik factory.',
    duration: '1 Day',
    persons: '20 Persons',
    filecode: 'kandy-day-tour',
    overview: `1 Day Kandy Excursion with Pabudu Tours — private air-conditioned vehicle, pickup and drop-off, multilingual local driver/guide, and special site guides for Kandy Temple and the Botanical Garden.`,
    tourType: 'Day Tour',

    itinerary: [
      {
        day: 1,
        title: '1 Day Kandy Excursion',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Temple of the Tooth or Nelligala Temple',
              icon: 'fa-place-of-worship',
              color: '#c0392b',
            },
            description:
              'Kandy Temple of the Sacred Tooth Relic or Nelligala Temple.',
            image: 'assets/img/onedayTour/kandy/3.jpg',
          },
          {
            type: 'Nature',
            title: {
              title: 'Peradeniya Botanical Garden',
              icon: 'fa-tree',
              color: '#27ae60',
            },
            description: 'National Botanical Garden at Peradeniya.',
            image: 'assets/img/onedayTour/kandy/2.jpg',
          },
          {
            type: 'Tea Experience',
            title: {
              title: 'Tea Plantation & Factory',
              icon: 'fa-coffee',
              color: '#8B4513',
            },
            description: 'Tea plantation and factory visit.',
            image: 'assets/img/onedayTour/kandy/5.jpg',
          },
          {
            type: 'Wildlife Experience',
            title: {
              title: 'Pinnawala Elephant Orphanage',
              icon: 'fa-paw',
              color: '#8e44ad',
            },
            description:
              'Pinnawala Elephant Orphanage or do activities with elephants in park.',
            image: 'assets/img/onedayTour/kandy/1.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Ceylon Ayurveda Herbal & Spice Garden',
              icon: 'fa-leaf',
              color: '#16a085',
            },
            description: 'Ceylon Ayurveda herbal and spice garden.',
            image: 'assets/img/onedayTour/kandy/7.jpg',
          },
          {
            type: 'Shopping',
            title: {
              title: 'Ceylon Batik & Saree Factory',
              icon: 'fa-store',
              color: '#e67e22',
            },
            description: 'Ceylon batik and saree factory.',
            image: 'assets/img/onedayTour/kandy/4.jpg',
          },
        ],
      },
    ],

    includes: [
      'Air condition private vehicle with parking fee',
      'Pickup and drop off',
      'Professional and friendly local driver/guide (English / Russian / German / French / Hindi)',
      'Special site guide for Kandy Temple and Botanical Garden',
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
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      this.intervalId = setInterval(() => this.nextImage(), 3000);
    } catch (error) {
      console.error('Client-side load error:', error);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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
    if (isPlatformBrowser(this.platformId)) {
      const barcode = 'kandy-day-tour';
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
}
