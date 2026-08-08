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
  selector: 'app-mirissa-day-tour-component',
  standalone: true,
  imports: [
    TourImageGalleryComponent,CommonModule, RouterModule, TourDetailsComponent, PackageItemComponent, TourBookingSidebarComponent],
  templateUrl: './mirissa-day-tour-component.html',
  styleUrl: './mirissa-day-tour-component.css'
})
export class MirissaDayTourComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img/onedayTour/mirissa/4.jpg',
    'assets/img/onedayTour/mirissa/5.jpg',
    'assets/img/onedayTour/mirissa/1.jpg',
    'assets/img/clientTours/92.jpg',
    'assets/img/clientTours/97.jpg',
    'assets/img/clientTours/102.jpg',
    'assets/img/clientTours/96.jpg',
  ];

  currentIndex = 0;
  intervalId: any;
  multiDayTours: any[] = [];
  selectedTours: any[] = [];
  userCountry = 'US';
  price = 0;

  tour = {
    title: 'Mirissa Whale Watching Day Tour Sri Lanka',
    description:
      'Private Mirissa day tour with whale watching (3–5 hours), Coconut Tree Hill, and swimming at Mirissa beach.',
    duration: '1 Day',
    persons: '20 Persons',
    filecode: 'mirissa-day-tour',
    overview: `Whale Watching at Mirissa with Pabudu Tours private air-conditioned vehicle, pickup and drop-off, English-speaking local driver, a 3–5 hour whale watching trip, Coconut Tree Hill, and time to swim at beautiful Mirissa beach.`,
    tourType: 'Day Tour',

    itinerary: [
      {
        day: 1,
        title: 'Whale Watching at Mirissa',
        activities: [
          {
            type: 'Wildlife Experience',
            title: {
              title: 'Whale Watching at Mirissa',
              icon: 'fa-water',
              color: '#2980b9',
            },
            description: 'Whale watching at Mirissa (3–5 hours).',
            image: 'assets/img/onedayTour/mirissa/1.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Coconut Tree Hill',
              icon: 'fa-tree',
              color: '#27ae60',
            },
            description: 'Visit Coconut Tree Hill for panoramic ocean and palm views.',
            image: 'assets/img/onedayTour/mirissa/5.jpg',
          },
          {
            type: 'Leisure',
            title: {
              title: 'Swim at Mirissa Beach',
              icon: 'fa-umbrella-beach',
              color: '#f39c12',
            },
            description: 'Swim at Mirissa’s beautiful beach.',
            image: 'assets/img/clientTours/92.jpg',
          },
        ],
      },
    ],

    includes: [
      'Air condition private vehicle with parking fee',
      'Pickup and drop off',
      'Professional and friendly local driver speaking English',
      'Unlimited mineral water',
      '24/7 unlimited service',
    ],
    excludes: [
      'Passenger boat tickets for each person',
      'Food and beverage',
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
      image: this.images[0],
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
    const barcode = 'mirissa-day-tour';
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
