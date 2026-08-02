import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TourDetails, TourDetailsComponent } from '../../../../sharedComponents/tour-details-component/tour-details-component';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import toursData from '../../../../databaseJson/tours.json';
import { CountryService } from '../../../../Services/country.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PackageItemComponent } from '../../../../sharedComponents/package-item-component/package-item-component';
import { TourBookingSidebarComponent } from '../../../../sharedComponents/tour-booking-sidebar/tour-booking-sidebar';
import { TourImageGalleryComponent } from '../../../../sharedComponents/tour-image-gallery/tour-image-gallery';


@Component({
  selector: 'app-bentota-tuk-tuk-tour-component',
  standalone: true,
  imports: [
    TourImageGalleryComponent,CommonModule, RouterModule, TourDetailsComponent, PackageItemComponent, TourBookingSidebarComponent],
  templateUrl: './bentota-tuk-tuk-tour-component.html',
  styleUrl: './bentota-tuk-tuk-tour-component.css'
})
export class BentotaTukTukTourComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img/onedayTour/Galle/2.jpg',
    'assets/img/onedayTour/Galle/6.jpg',
    'assets/img/onedayTour/Galle/5.jpg',
    'assets/img/onedayTour/Galle/1.jpg',
    'assets/img/onedayTour/Galle/3.jpg',
  ];

  currentIndex = 0;
  intervalId: any;
  multiDayTours: any[] = [];
  selectedTours: any[] = [];
  userCountry = 'US';
  price = 0;

  tour = {
    title: 'Bentota Tuk Tuk Tour Sri Lanka – Beach, Temple & Local Ride',
    description:
      'Hop on a tuk tuk and discover Bentota beaches, culture and hidden gems on a short 2–3 hour ride with a friendly local driver.',
    duration: '2–3 Hours',
    persons: 'Max 3 Persons',
    maxPersons: 3,
    filecode: 'bentota-tuk-tuk-tour',

    overview: `Ride. Explore. Experience Bentota! Hop on a tuk tuk and discover the stunning beaches, rich culture and hidden gems of Bentota. A perfect short tour for unforgettable memories safe, reliable and fuel included, with English / Russian / German speaking drivers.`,
    tourType: 'Tuk Tuk Ride',

    itinerary: [
      {
        day: 1,
        title: 'Bentota Tuk Tuk Tour (2–3 Hours)',
        activities: [
          {
            type: 'Beach',
            title: {
              title: 'Beautiful Bentota Beach',
              icon: 'fa-umbrella-beach',
              color: '#f39c12',
            },
            description: 'Enjoy Bentota’s stunning beach scenery and photo stops.',
            image: 'assets/img/onedayTour/Galle/2.jpg',
          },
          {
            type: 'Wildlife',
            title: {
              title: 'Turtle Hatchery Visit',
              icon: 'fa-water',
              color: '#2980b9',
            },
            description: 'Visit a turtle hatchery and see baby turtles up close.',
            image: 'assets/img/onedayTour/Galle/6.jpg',
          },
          {
            type: 'Cultural Visit',
            title: {
              title: 'Kande Vihara Temple',
              icon: 'fa-place-of-worship',
              color: '#c0392b',
            },
            description: 'Visit the iconic Kande Vihara Temple.',
            image: 'assets/img/onedayTour/Galle/5.jpg',
          },
          {
            type: 'Optional',
            title: {
              title: 'Madu River Boat Safari (Optional)',
              icon: 'fa-ship',
              color: '#16a085',
            },
            description: 'Optional Madu River boat safari available on request.',
            image: 'assets/img/onedayTour/Galle/3.jpg',
          },
          {
            type: 'Shopping',
            title: {
              title: 'Local Shops & Souvenir Stop',
              icon: 'fa-shopping-bag',
              color: '#8e44ad',
            },
            description: 'Stop at local shops for souvenirs and gifts.',
            image: 'assets/img/onedayTour/Galle/1.jpg',
          },
          {
            type: 'Photo',
            title: {
              title: 'Perfect Photo Opportunities',
              icon: 'fa-camera',
              color: '#27ae60',
            },
            description: 'Scenic stops for unforgettable Bentota photos.',
            image: 'assets/img/5daysTours/31.jpg',
          },
        ],
      },
    ],

    includes: [
      'Safe and reliable tuk tuk ride',
      'Friendly local driver (English / Russian / German)',
      'Fuel included',
      '2–3 hours duration',
      'Couple, family and solo friendly',
    ],
    excludes: [
      'Entrance and activity fees',
      'Optional Madu River boat safari tickets',
      'Food and drinks',
    ],
  };

  get currentImage() {
    return this.images[this.currentIndex];
  }

  get tourForDetails(): TourDetails {
    return {
      filecode: this.tour.filecode,
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
    const barcode = 'bentota-tuk-tuk-tour';
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
