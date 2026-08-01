import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  TourDetails,
  TourDetailsComponent,
} from '../../../../sharedComponents/tour-details-component/tour-details-component';
import toursData from '../../../../databaseJson/tours.json';
import { PackageItemComponent } from '../../../../sharedComponents/package-item-component/package-item-component';
import { TourBookingSidebarComponent } from '../../../../sharedComponents/tour-booking-sidebar/tour-booking-sidebar';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../../../Services/country.service';

@Component({
  selector: 'app-five-days-tour-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TourDetailsComponent,
    PackageItemComponent,
    TourBookingSidebarComponent,
  ],
  templateUrl: './five-days-tour-component.html',
  styleUrls: ['./five-days-tour-component.css'],
})
export class FiveDaysTourComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img/5daysTours/beqnuxidbmckapjcag2m.jpg',
    'assets/img/5daysTours/fozjxf01vl9yehvucwn2.jpg',
    'assets/img/5daysTours/c8dyxgodivrwf4hxzziq.jpg',
    'assets/img/5daysTours/dp8fjrahvepdlhdudxj0.jpg',
    'assets/img/5daysTours/slqwoimy5yhfgcicn8ob.jpg',
  ];

  currentIndex = 0;
  intervalId: any;
  multiDayTours: any[] = [];
  selectedTours: any[] = [];
  userCountry = 'US';
  price = 0;

  tour = {
    title: '5 Day Sri Lanka Tour – Sigiriya, Kandy, Ella, Safari & South Coast',
    description:
      'Sigiriya, Kandy, Nuwara Eliya, Ella, safari and the down south — a private 5-day excursion.',
    duration: '5 Days / 4 Nights',
    persons: '1-20 Persons',
    filecode: '5-day-sri-lanka-tour',
    overview: `5 Days (4 Nights) Excursion in Sri Lanka — Sigiriya / Kandy / Nuwara Eliya / Ella / Safari and Down South.

Private chauffeur-guided travel from Colombo Airport through the Cultural Triangle, hill country, wildlife safari and southwest coast, ending with airport or hotel drop-off.

1st and 2nd day program will be customize depends with your arrival time.`,

    tourType: 'Round Tour',

    itinerary: [
      {
        day: 1,
        title: 'Colombo Airport to Sigiriya',
        activities: [
          {
            type: 'Arrival',
            title: { title: 'Airport Pickup', icon: 'fa-plane', color: '#2c3e50' },
            description: 'From Colombo Airport to Sigiriya.',
          },
          {
            type: 'Accommodation',
            title: {
              title: '4-Star Hotel near Sigiriya',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description:
              'Relax at your 1st night at 4-star hotel near Sigiriya Lion Rock.',
            image: 'assets/img/5daysTours/c.jpg',
            extra: ['4 Star Hotel', 'Breakfast & Dinner'],
          },
        ],
      },
      {
        day: 2,
        title: 'Sigiriya to Kandy',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Sigiriya Lion Rock',
              icon: 'fa-mountain',
              color: '#e74c3c',
            },
            description: 'Climb Sigiriya Lion Rock.',
            image: 'assets/img/5daysTours/c8dyxgodivrwf4hxzziq.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Dambulla Cave Temple & Golden Buddha',
              icon: 'fa-place-of-worship',
              color: '#2980b9',
            },
            description: 'Dambulla Cave Temple and Golden Buddha statue.',
            image: 'assets/img/5daysTours/4.jpg',
          },
          {
            type: 'Village Experience',
            title: {
              title: 'Habarana Village Safari',
              icon: 'fa-leaf',
              color: '#8e44ad',
            },
            description: 'Habarana Village safari.',
            image: 'assets/img/5daysTours/36.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Matale Hindu Kovil',
              icon: 'fa-place-of-worship',
              color: '#16a085',
            },
            description: 'Matale Hindu kovil.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Matale Ayurveda Herbal & Spice Garden',
              icon: 'fa-leaf',
              color: '#27ae60',
            },
            description: 'Matale Ayurveda herbal & spice garden.',
          },
          {
            type: 'Note',
            title: {
              title: 'Arrival-time note',
              icon: 'fa-info-circle',
              color: '#c0392b',
            },
            description:
              '1st and 2nd day program will be customize depends with your arrival time.',
          },
          {
            type: 'Accommodation',
            title: { title: 'Kandy Hotel', icon: 'fa-hotel', color: '#27ae60' },
            description: 'Stay 2nd night at Kandy hotel.',
            image: 'assets/img/5daysTours/25.jpg',
            extra: ['4 Star Hotel', 'Breakfast & Dinner'],
          },
        ],
      },
      {
        day: 3,
        title: 'Kandy to Nuwara Eliya / Ramboda',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Temple of the Tooth or Nelligala Temple',
              icon: 'fa-place-of-worship',
              color: '#2980b9',
            },
            description: 'Kandy Temple of the Tooth Relic or Nelligala Temple.',
            image: 'assets/img/5daysTours/4.jpg',
          },
          {
            type: 'Nature',
            title: {
              title: 'National Botanical Garden',
              icon: 'fa-tree',
              color: '#16a085',
            },
            description: 'National Botanical Garden.',
            image: 'assets/img/5daysTours/26.jpg',
          },
          {
            type: 'Wildlife Experience',
            title: {
              title: 'Pinnawala Elephant Orphanage',
              icon: 'fa-paw',
              color: '#8e44ad',
            },
            description:
              'Pinnawala Elephant Orphanage or elephant activities (riding, feeding and bathing elephants).',
            image: 'assets/img/5daysTours/7.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Ambuluwawa Tower',
              icon: 'fa-mountain',
              color: '#e67e22',
            },
            description: 'Ambuluwawa Tower (free tuk tuk included).',
            image: 'assets/img/5daysTours/9.jpg',
          },
          {
            type: 'Tea Experience',
            title: {
              title: 'Tea Plantation & Factory',
              icon: 'fa-coffee',
              color: '#8B4513',
            },
            description: 'Tea plantation and factory visit.',
            image: 'assets/img/5daysTours/28.png',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Nuwara Eliya or Ramboda Falls Hotel',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description:
              'Stay 3rd night at Nuwara Eliya hotel or Ramboda Falls hotel.',
            image: 'assets/img/5daysTours/29.jpg',
            extra: ['4 Star Hotel', 'Breakfast & Dinner'],
          },
        ],
      },
      {
        day: 4,
        title: 'Ella & Safari',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Famous Ella Train Ride',
              icon: 'fa-train',
              color: '#c0392b',
            },
            description: 'Ella famous train ride.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Nine Arch Bridge',
              icon: 'fa-bridge',
              color: '#e67e22',
            },
            description: 'Nine Arch Bridge (free tuk tuk included).',
            image: 'assets/img/5daysTours/5.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Ravana Waterfall',
              icon: 'fa-water',
              color: '#3498db',
            },
            description: 'Ravana waterfall.',
            image: 'assets/img/5daysTours/27.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: "Little Adam's Peak",
              icon: 'fa-mountain',
              color: '#8e44ad',
            },
            description: "Little Adam's Peak mountain.",
            image: 'assets/img/5daysTours/9.jpg',
          },
          {
            type: 'Safari',
            title: {
              title: 'Yala or Udawalawe Safari',
              icon: 'fa-paw',
              color: '#27ae60',
            },
            description: 'Yala or Udawalawe national safari.',
            image: 'assets/img/5daysTours/24.jpg',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Yala or Udawalawe Jungle Hotel',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay 4th night at hotel Yala or Udawalawe jungle.',
            image: 'assets/img/5daysTours/30.jpg',
            extra: ['4 Star Hotel', 'Breakfast & Dinner'],
          },
        ],
      },
      {
        day: 5,
        title: 'Down South & Departure',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Mirissa Coconut Tree Hill',
              icon: 'fa-tree',
              color: '#27ae60',
            },
            description: 'Mirissa Coconut Tree Hill.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Galle Dutch Fort',
              icon: 'fa-landmark',
              color: '#16a085',
            },
            description: 'Galle Dutch Fort.',
            image: 'assets/img/5daysTours/32.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Gem & Moonstone Mine Village',
              icon: 'fa-gem',
              color: '#8e44ad',
            },
            description: 'Gem and Moonstone mine village.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Tsunami Museum',
              icon: 'fa-landmark',
              color: '#2c3e50',
            },
            description: 'Tsunami Museum.',
          },
          {
            type: 'Conservation',
            title: {
              title: 'Turtle Farm',
              icon: 'fa-water',
              color: '#2980b9',
            },
            description: 'Turtle farm visit.',
            image: 'assets/img/5daysTours/31.jpg',
          },
          {
            type: 'Boat Safari',
            title: {
              title: 'Madu or Bentota River Safari',
              icon: 'fa-ship',
              color: '#3498db',
            },
            description:
              '1-hour Madu River safari or Bentota River safari.',
            image: 'assets/img/5daysTours/32.jpg',
          },
          {
            type: 'Departure',
            title: {
              title: 'Airport or Hotel Drop-off',
              icon: 'fa-plane',
              color: '#2c3e50',
            },
            description:
              'Drop off to airport or your hotel (your final destination).',
          },
        ],
      },
    ],

    includes: [
      'Air condition private vehicle with hotel pickup and drop off (with parking fees)',
      'Professional and friendly local driver/guide for the whole excursion (English / Russian / German / French / Hindi)',
      'Site professional special guide (licensed by Sri Lanka Tourism Authority) for Kandy Temple, National Botanical Garden, Sigiriya',
      'Free tuk tuk for Nine Arch Bridge and Ambuluwawa',
      'Your hotel accommodation — 4-star hotel (including breakfast and dinner)',
      'Unlimited mineral water bottles',
      "Your driver/guide accommodation and meal",
      '24/7 customer and friendly service',
    ],

    excludes: [
      'Entrance and activities fees',
      'Food and drinks',
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
    } catch (error) {
      console.error('Browser data load failed:', error);
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

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  bookNow() {
    if (isPlatformBrowser(this.platformId)) {
      const barcode = '5-day-sri-lanka-tour';
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
