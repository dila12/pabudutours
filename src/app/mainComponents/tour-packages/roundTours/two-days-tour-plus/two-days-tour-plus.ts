import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PackageItemComponent } from '../../../../sharedComponents/package-item-component/package-item-component';
import { TourBookingSidebarComponent } from '../../../../sharedComponents/tour-booking-sidebar/tour-booking-sidebar';
import {
  TourDetails,
  TourDetailsComponent,
} from '../../../../sharedComponents/tour-details-component/tour-details-component';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../../../Services/country.service';
import toursData from '../../../../databaseJson/tours.json';

@Component({
  selector: 'app-two-days-tour-plus',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TourDetailsComponent,
    PackageItemComponent,
    TourBookingSidebarComponent,
  ],
  templateUrl: './two-days-tour-plus.html',
  styleUrl: './two-days-tour-plus.css',
})
export class TwoDaysTourPlus implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img/2daysTours/1.jpeg',
    'assets/img/2daysTours/2.jpeg',
    'assets/img/2daysTours/3.jpeg',
    'assets/img/2daysTours/4.jpg',
    'assets/img/2daysTours/5.jpg',
    'assets/img/2daysTours/6.jpeg',
  ];

  currentIndex = 0;
  intervalId: any;
  multiDayTours: any[] = [];
  selectedTours: any[] = [];
  userCountry = 'US';
  price = 0;

  tour = {
    title:
      'Ella & Kandy 2 Day Excursion – Yala Safari, Train Ride & Hill Country Experience',

    description:
      'Enjoy a 2-day private tour covering Yala safari, Ella highlights, scenic train ride, tea plantations, and Kandy cultural attractions with a comfortable stay in Nuwara Eliya.',

    duration: '2 Days',
    persons: 'Private Tour (1-20 Persons)',
    filecode: '2-day-ella-kandy-private-tour-sri-lanka',

    overview: `Explore the best of Sri Lanka in just 2 days. Experience a Yala morning safari, stunning waterfalls, and the famous Ella train ride. Visit iconic places like Nine Arch Bridge and enjoy a peaceful overnight stay in Nuwara Eliya. On day two, discover tea plantations, Ambuluwawa Tower, Kandy cultural sites, and elephant experiences before ending your journey.`,

    tourType: 'Round Tour',

    itinerary: [
      {
        day: 1,
        title: 'Yala Safari & Ella Scenic Tour',
        activities: [
          {
            type: 'Wildlife Experience',
            title: {
              title: 'Yala Morning Safari',
              icon: 'fa-paw',
              color: '#27ae60',
            },
            description:
              'Experience an exciting morning safari in Yala National Park, home to leopards, elephants, and diverse wildlife.',
            image: 'assets/img/2daysTours/trpcuc5klgd2n9eugdeg.jpg',
          },
          {
            type: 'Waterfall Visit',
            title: {
              title: 'Ravana Falls',
              icon: 'fa-water',
              color: '#2980b9',
            },
            description:
              'Visit the famous Ravana Falls, one of the most beautiful waterfalls in Sri Lanka.',
            image: 'assets/img/2daysTours/13.jpg',
          },
          {
            type: 'Train Experience',
            title: {
              title: 'Ella Train Ride',
              icon: 'fa-train',
              color: '#8e44ad',
            },
            description:
              'Enjoy one of the most scenic train journeys in the world through Sri Lanka’s hill country.',
            image: 'assets/img/2daysTours/6.jpeg',
          },
          {
            type: 'Scenic Visit',
            title: {
              title: 'Nine Arch Bridge',
              icon: 'fa-archway',
              color: '#16a085',
            },
            description:
              'Visit the iconic Nine Arch Bridge surrounded by lush green tea plantations.',
            image: 'assets/img/2daysTours/3.jpeg',
          },
          {
            type: 'Waterfall Visit',
            title: {
              title: 'Ramboda Falls',
              icon: 'fa-water',
              color: '#3498db',
            },
            description: 'Stop at Ramboda Falls while heading to Nuwara Eliya.',
            image: 'assets/img/2daysTours/11.jpg',
          },
          {
            type: 'Stay',
            title: {
              title: 'Overnight Stay – Nuwara Eliya',
              icon: 'fa-bed',
              color: '#f39c12',
            },
            description:
              'Relax and stay overnight in a comfortable 4-star hotel in Nuwara Eliya.',
            image: 'assets/img/2daysTours/hotel.jpg',
          },
        ],
      },

      {
        day: 2,
        title: 'Tea Plantation & Kandy Cultural Tour',
        activities: [
          {
            type: 'Tea Experience',
            title: {
              title: 'Ceylon Tea Plantation & Factory',
              icon: 'fa-leaf',
              color: '#27ae60',
            },
            description:
              'Visit a tea plantation and factory to learn how world-famous Ceylon tea is made.',
            image: 'assets/img/2daysTours/17.jpg',
          },
          {
            type: 'Scenic Tower',
            title: {
              title: 'Ambuluwawa Tower',
              icon: 'fa-mountain',
              color: '#9b59b6',
            },
            description:
              'Climb the unique tower for breathtaking 360° mountain views.',
            image: 'assets/img/2daysTours/12.jpg',
          },
          {
            type: 'Cultural Visit',
            title: {
              title: 'Temple of the Tooth / Nelligala Temple',
              icon: 'fa-place-of-worship',
              color: '#d35400',
            },
            description:
              'Visit sacred Buddhist temples in Kandy including the famous Temple of the Tooth.',
            image: 'assets/img/2daysTours/4.jpg',
          },
          {
            type: 'Garden Visit',
            title: {
              title: 'Peradeniya Botanical Garden',
              icon: 'fa-tree',
              color: '#2ecc71',
            },
            description:
              'Explore Sri Lanka’s largest botanical garden with exotic plants and trees.',
            image: 'assets/img/2daysTours/26.jpg',
          },
          {
            type: 'Wildlife Experience',
            title: {
              title: 'Elephant Experience',
              icon: 'fa-paw',
              color: '#16a085',
            },
            description:
              'Visit Pinnawala or enjoy elephant activities like feeding, bathing, or riding.',
            image: 'assets/img/2daysTours/7.jpg',
          },
        ],
      },
    ],

    includes: [
      'Air-conditioned private vehicle with hotel pickup & drop-off',
      'Professional driver/guide (English, Russian, German, Fren Hindi)',
      'Licensed guides for Temple of the Tooth & Botanical Garden',
      'Free tuk tuk service (Nine Arch Bridge & Ambuluwawa)',
      'Train tickets for Ella scenic ride',
      '4-star hotel accommodation with breakfast & dinner',
      'Unlimited mineral water bottles',
      'Driver accommodation & meals',
      '24/7 customer support',
    ],

    excludes: [
      'Entrance & activity fees',
      'Food & drinks (outside hotel meals)',
    ],
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private countryService: CountryService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  get currentImage() {
    return this.images[this.currentIndex];
  }

  get nextImages() {
    return Array.from({ length: 4 }, (_, i) => {
      const index = (this.currentIndex + i + 1) % this.images.length;
      return { src: this.images[index], index };
    });
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
        toursData.multiDayTours,
      );
      this.selectedTours = this.multiDayTours
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      this.intervalId = setInterval(() => this.nextImage(), 3000);
    } catch (err) {
      console.error('Client load failed:', err);
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
    console.log(
      'Loading price for filecode:',
      filecode,
      'and country:',
      this.userCountry,
    );

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
            error: () => resolve(0),
          });
        },
      });
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  bookNow() {
    if (isPlatformBrowser(this.platformId)) {
      const barcode = '2-day-ella-kandy-private-tour-sri-lanka';
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

  getMainPersons(persons: string): string {
    if (!persons) return '';
    return persons.split('(')[0].trim(); // "Private Tour"
  }

  getSubPersons(persons: string): string {
    if (!persons) return '';
    const match = persons.match(/\((.*?)\)/);
    return match ? match[1] : ''; // "1-20 Persons"
  }
}
