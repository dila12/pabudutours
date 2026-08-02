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
  selector: 'app-sigiriya-day-tour-component',
  standalone: true,
  imports: [
    TourImageGalleryComponent,CommonModule, RouterModule, TourDetailsComponent, PackageItemComponent, TourBookingSidebarComponent],
  templateUrl: './sigiriya-day-tour-component.html',
  styleUrl: './sigiriya-day-tour-component.css'
})
export class SigiriyaDayTourComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img/onedayTour/Sigiriya/1.jpg',
    'assets/img/onedayTour/Sigiriya/2.jpg',
    'assets/img/onedayTour/Sigiriya/3.jpg',
    'assets/img/onedayTour/Sigiriya/4.jpg',
    'assets/img/onedayTour/Sigiriya/5.jpg',
  ];

  currentIndex = 0;
  intervalId: any;
  multiDayTours: any[] = [];
  selectedTours: any[] = [];
  userCountry = 'US';
  price = 0;

  tour = {
    title: 'Sigiriya Day Tour Sri Lanka – Lion Rock & Cultural Triangle',
    description:
      'Private full-day Sigiriya excursion covering Lion Rock, Dambulla Cave Temple, Habarana village safari and Habarana elephant eco park safari.',
    duration: '1 Day',
    persons: '20 Persons',
    filecode: 'sigiriya-day-tour',
    overview: `1 Day Sigiriya Excursion with Pabudu Tours private air-conditioned vehicle, pickup and drop-off, multilingual local driver/guide, and a special site guide for Sigiriya.`,
    tourType: 'Day Tour',

    itinerary: [
      {
        day: 1,
        title: '1 Day Sigiriya Excursion',
        activities: [
          {
            type: 'Adventure',
            title: {
              title: 'Sigiriya Lion Rock',
              icon: 'fa-mountain',
              color: '#e74c3c',
            },
            description: 'Climb Sigiriya Lion Rock.',
            image: 'assets/img/onedayTour/Sigiriya/8.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Dambulla Cave Temple & Golden Buddha',
              icon: 'fa-place-of-worship',
              color: '#c0392b',
            },
            description: 'Dambulla Cave Temple and Golden Buddha statue.',
            image: 'assets/img/onedayTour/Sigiriya/6.jpg',
          },
          {
            type: 'Village Experience',
            title: {
              title: 'Habarana Village Safari',
              icon: 'fa-leaf',
              color: '#8e44ad',
            },
            description: 'Habarana village safari.',
            image: 'assets/img/onedayTour/Sigiriya/1.jpg',
          },
          {
            type: 'Safari',
            title: {
              title: 'Habarana Elephant Safari (Eco Park)',
              icon: 'fa-paw',
              color: '#27ae60',
            },
            description: 'Habarana elephant safari at the eco park.',
            image: 'assets/img/onedayTour/Sigiriya/9.jpg',
          },
        ],
      },
    ],

    includes: [
      'Air condition private vehicle with parking fee',
      'Pickup and drop off',
      'Professional and friendly local driver/guide (English / Russian / German / French / Hindi)',
      'Special site guide for Sigiriya',
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
    const barcode = 'sigiriya-day-tour';
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
