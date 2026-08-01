import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import {
  TourDetails,
  TourDetailsComponent,
} from '../../../../sharedComponents/tour-details-component/tour-details-component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import toursData from '../../../../databaseJson/tours.json';
import { PackageItemComponent } from '../../../../sharedComponents/package-item-component/package-item-component';
import { TourBookingSidebarComponent } from '../../../../sharedComponents/tour-booking-sidebar/tour-booking-sidebar';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../../../Services/country.service';

@Component({
  selector: 'app-ten-days-tour-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TourDetailsComponent,
    PackageItemComponent,
    TourBookingSidebarComponent,
  ],
  templateUrl: './ten-days-tour-component.html',
  styleUrl: './ten-days-tour-component.css',
})
export class TenDaysTourComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img/7daystour/lzurk0uk82qqjh6soonh.jpg',
    'assets/img/7daystour/u19dmfbuae46dhzpqctu.jpg',
    'assets/img/7daystour/p5nnnq3wt124wwoa0rvo.jpg',
    'assets/img/7daystour/fhlfhn3lx1onsizfpy76.jpg',
    'assets/img/7daystour/dtebtjzozh7sfof4ci7c.jpg',
  ];

  currentIndex = 0;
  intervalId: any = null;
  multiDayTours: any[] = [];
  selectedTours: any[] = [];
  userCountry = 'US';
  price = 0;

  tour = {
    title: '10 Day Sri Lanka Grand Tour – Complete Island Experience',
    description:
      'A private 10-day Sri Lanka excursion covering Sigiriya, Polonnaruwa, Kandy, Nuwara Eliya, Ella, safari, Mirissa, Galle and Colombo.',
    duration: '10 Days / 9 Nights',
    persons: '1-20 Persons',
    filecode: '10-day-sri-lanka-tour',
    overview: `10 Days / 9 Nights Excursion in Sri Lanka with Pabudu Tours — from airport arrival at Sigiriya through Polonnaruwa, Kandy, hill country, Ella, wildlife safari, Mirissa beaches, Galle and Colombo city highlights.`,

    tourType: 'Round Tour',

    itinerary: [
      {
        day: 1,
        title: 'Airport to Sigiriya',
        activities: [
          {
            type: 'Arrival',
            title: { title: 'Airport Arrival', icon: 'fa-plane', color: '#2c3e50' },
            description: 'From airport arrival to Sigiriya.',
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
            type: 'Safari',
            title: {
              title: 'Habarana Village or Eco Park Safari',
              icon: 'fa-leaf',
              color: '#8e44ad',
            },
            description: 'Habarana Village Safari or Habarana Eco Park safari.',
            image: 'assets/img/5daysTours/36.jpg',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Palwehera Resort Sigiriya',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay 1st night at Palwehera Resort at Sigiriya.',
            image: 'assets/img/5daysTours/c.jpg',
          },
        ],
      },
      {
        day: 2,
        title: 'Sigiriya & Polonnaruwa',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Sigiriya Lion Rock or Pidurangala',
              icon: 'fa-mountain',
              color: '#e74c3c',
            },
            description: 'Sigiriya Lion Rock or Pidurangala.',
            image: 'assets/img/5daysTours/c8dyxgodivrwf4hxzziq.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Polonnaruwa Ancient City',
              icon: 'fa-landmark',
              color: '#16a085',
            },
            description: 'Explore Polonnaruwa ancient city.',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Fresco Villa or Similar',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay night at Fresco Villa or similar.',
            image: 'assets/img/5daysTours/c.jpg',
          },
        ],
      },
      {
        day: 3,
        title: 'Matale to Kandy',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Matale Hindu Temple',
              icon: 'fa-place-of-worship',
              color: '#2980b9',
            },
            description: 'Matale Hindu temple.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Ayurveda Herbal Garden',
              icon: 'fa-leaf',
              color: '#27ae60',
            },
            description: 'Ayurveda herbal garden.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Kandy View Point',
              icon: 'fa-mountain',
              color: '#e67e22',
            },
            description: 'Kandy view point.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Temple of the Tooth Relic',
              icon: 'fa-place-of-worship',
              color: '#2980b9',
            },
            description: 'Kandy Temple of the Tooth Relic.',
            image: 'assets/img/5daysTours/4.jpg',
          },
          {
            type: 'Cultural show',
            title: {
              title: 'Kandy Cultural Dance Show',
              icon: 'fa-theater-masks',
              color: '#8e44ad',
            },
            description: 'Kandy culture dance show.',
            image: 'assets/img/5daysTours/fifyrnqt5tvouhpgh6kk.jpg',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Hotel Topaz Kandy',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay night at Hotel Topaz Kandy.',
            image: 'assets/img/5daysTours/25.jpg',
          },
        ],
      },
      {
        day: 4,
        title: 'Kandy to Ramboda',
        activities: [
          {
            type: 'Nature',
            title: {
              title: 'Peradeniya Botanical Garden',
              icon: 'fa-tree',
              color: '#16a085',
            },
            description: 'Peradeniya National Botanical Garden.',
            image: 'assets/img/5daysTours/26.jpg',
          },
          {
            type: 'Tea Experience',
            title: {
              title: 'Tea Plantation & Factory',
              icon: 'fa-coffee',
              color: '#8B4513',
            },
            description: 'Tea plantation and factory.',
            image: 'assets/img/5daysTours/28.png',
          },
          {
            type: 'Wildlife Experience',
            title: {
              title: 'Pinnawala Elephant Orphanage',
              icon: 'fa-paw',
              color: '#8e44ad',
            },
            description:
              'Pinnawala Elephant Orphanage or do activities with elephants.',
            image: 'assets/img/5daysTours/7.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Ambuluwawa Tower',
              icon: 'fa-mountain',
              color: '#e67e22',
            },
            description: 'Ambuluwawa Tower.',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Ramboda Falls Hotel',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay night at Ramboda Falls Hotel.',
            image: 'assets/img/5daysTours/29.jpg',
          },
        ],
      },
      {
        day: 5,
        title: 'Nuwara Eliya to Ella',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Nuwara Eliya Post Office',
              icon: 'fa-landmark',
              color: '#16a085',
            },
            description: 'Nuwara Eliya Post Office.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Nine Arch Bridge',
              icon: 'fa-bridge',
              color: '#c0392b',
            },
            description: 'Nine Arch Bridge.',
            image: 'assets/img/5daysTours/5.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: "Little Adam's Peak",
              icon: 'fa-mountain',
              color: '#8e44ad',
            },
            description: "Little Adam's Peak.",
            image: 'assets/img/5daysTours/9.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Ella Train Ride',
              icon: 'fa-train',
              color: '#e67e22',
            },
            description: 'Ella train ride.',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Oak Ray Ella Gap Hotel',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay night at Oak Ray Ella Gap Hotel.',
            image: 'assets/img/5daysTours/30.jpg',
          },
        ],
      },
      {
        day: 6,
        title: 'Ella to Yala / Udawalawe',
        activities: [
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
            type: 'Wildlife Experience',
            title: {
              title: 'Watching Monkeys on the Street',
              icon: 'fa-paw',
              color: '#8e44ad',
            },
            description: 'Watching monkeys on the street.',
          },
          {
            type: 'Safari',
            title: {
              title: 'Yala or Udawalawe Safari',
              icon: 'fa-paw',
              color: '#27ae60',
            },
            description:
              'Wild safari at Yala National Park or Udawalawe National Park.',
            image: 'assets/img/5daysTours/24.jpg',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Grand Tamarind or Peacock Hotel',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay night at Grand Tamarind Hotel or Peacock Hotel.',
          },
        ],
      },
      {
        day: 7,
        title: 'Mirissa Beach',
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
            type: 'Leisure',
            title: {
              title: 'Mirissa Beach',
              icon: 'fa-umbrella-beach',
              color: '#f39c12',
            },
            description: 'Beautiful Mirissa beach.',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Somerset Mirissa Hotel',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay at Somerset Mirissa Hotel.',
          },
        ],
      },
      {
        day: 8,
        title: 'Whale Watching & Surfing',
        activities: [
          {
            type: 'Wildlife Experience',
            title: {
              title: 'Whale Watching at Mirissa',
              icon: 'fa-water',
              color: '#2980b9',
            },
            description: 'Whale watching at Mirissa.',
          },
          {
            type: 'Activity',
            title: {
              title: 'Weligama Surfing Club',
              icon: 'fa-water',
              color: '#3498db',
            },
            description: 'Weligama surfing club.',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Somerset Hotel',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay at Somerset Hotel.',
          },
        ],
      },
      {
        day: 9,
        title: 'Unawatuna, Galle & Coast',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Stilt Fishermen at Unawatuna',
              icon: 'fa-water',
              color: '#3498db',
            },
            description: 'Stilt fishermen at Unawatuna.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Galle Fort & Ancient City',
              icon: 'fa-landmark',
              color: '#16a085',
            },
            description: 'Galle Fort and ancient city.',
            image: 'assets/img/5daysTours/32.jpg',
          },
          {
            type: 'Activity',
            title: {
              title: 'Swimming with the Turtles',
              icon: 'fa-water',
              color: '#2980b9',
            },
            description: 'Swimming with the turtles.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Moonstone Mine Village',
              icon: 'fa-gem',
              color: '#8e44ad',
            },
            description: 'Moonstone mine village.',
          },
          {
            type: 'Conservation',
            title: {
              title: 'Turtle Hatchery',
              icon: 'fa-water',
              color: '#27ae60',
            },
            description: 'Turtle hatchery.',
            image: 'assets/img/5daysTours/31.jpg',
          },
          {
            type: 'Boat Safari',
            title: {
              title: 'River Boat Safari',
              icon: 'fa-ship',
              color: '#3498db',
            },
            description: 'River boat safari.',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Kamili Beach Resort',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay night at Kamili Beach Resort.',
          },
        ],
      },
      {
        day: 10,
        title: 'Colombo City Highlights',
        activities: [
          {
            type: 'Shopping',
            title: {
              title: 'Souvenir & Shopping Bazaar at Kalutara',
              icon: 'fa-store',
              color: '#e67e22',
            },
            description: 'Souvenir and shopping bazaar at Kalutara.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Gangaramaya Temple',
              icon: 'fa-place-of-worship',
              color: '#2980b9',
            },
            description: 'Gangaramaya Temple.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Red Mosque',
              icon: 'fa-mosque',
              color: '#c0392b',
            },
            description: 'Red Mosque.',
            image: 'assets/img/7daystour/owzua0jhk0zazg9d8hcn.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Independence Square',
              icon: 'fa-landmark',
              color: '#16a085',
            },
            description: 'Independence Square.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Old Lighthouse Colombo',
              icon: 'fa-lightbulb',
              color: '#f39c12',
            },
            description: 'Old lighthouse at Colombo.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Galle Face Beach',
              icon: 'fa-umbrella-beach',
              color: '#3498db',
            },
            description: 'Galle Face Beach.',
            image: 'assets/img/7daystour/qu0e7cjpkcfhfds1zeem.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Pettah Market',
              icon: 'fa-store',
              color: '#e74c3c',
            },
            description: 'Pettah Market.',
            image: 'assets/img/7daystour/vlk48jx8ywhuzyqlvqg8.jpg',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Kamili Beach Hotel or Similar',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay night at Kamili Beach Hotel or similar.',
          },
        ],
      },
    ],

    includes: [
      'Air-Conditioned Private Vehicle',
      'English Speaking Professional Driver',
      'Half Board Accommodation (9 Nights)',
      'Fuel & Parking Fees',
      'Airport Pickup & Drop Off',
    ],

    excludes: [
      'Entrance & Activity Fees',
      'Lunch & Drinks',
      'Personal Expenses',
    ],
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private countryService: CountryService,
    @Inject(PLATFORM_ID) private platformId: Object
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
        toursData.multiDayTours
      );

      this.selectedTours = this.multiDayTours
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      this.intervalId = setInterval(() => this.nextImage(), 3000);
    } catch (error) {
      console.error('Client-side loading error:', error);
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
            error: () => resolve(0),
          });
        },
      });
    });
  }

  ngOnDestroy() {
    const isBrowser = isPlatformBrowser(this.platformId);
    if (isBrowser && this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  bookNow() {
    if (isPlatformBrowser(this.platformId)) {
      const barcode = '10-day-sri-lanka-tour';
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
