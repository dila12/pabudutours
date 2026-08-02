import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
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
import { TourImageGalleryComponent } from '../../../../sharedComponents/tour-image-gallery/tour-image-gallery';


@Component({
  selector: 'app-two-day-tour-component',
  standalone: true,
  imports: [
    TourImageGalleryComponent,
    CommonModule,
    RouterModule,
    TourDetailsComponent,
    PackageItemComponent,
    TourBookingSidebarComponent,
  ],
  templateUrl: './two-day-tour-component.html',
  styleUrls: ['./two-day-tour-component.css'],
})
export class TwoDayTourComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img/5daysTours/36.jpg',
    'assets/img/5daysTours/42.jpg',
    'assets/img/5daysTours/14.jpg',
    'assets/img/5daysTours/43.jpg',
    'assets/img/5daysTours/34.jpg',
  ];

  currentIndex = 0;
  intervalId: any;
  multiDayTours: any[] = [];
  selectedTours: any[] = [];
  userCountry = 'US';
  price = 0;

  tour = {
  title: '2 Day Sigiriya & Kandy Tour Sri Lanka – Culture & Elephant Safari',

  description:
    'Explore Sigiriya, Dambulla, village life, elephant safari and Kandy highlights in this 2-day private tour with 4-star hotel stay.',

  duration: '2 Days',
  persons: 'Private Tour (1-20 Persons)',
  filecode: '2-day-sigiriya-kandy-private-tour-sri-lanka',

  overview: `Discover Sri Lanka’s cultural and natural beauty in this 2-day journey. Climb Sigiriya Lion Rock or Pidurangala, explore ancient temples, enjoy a village experience and elephant safari. On day two, visit Kandy’s cultural sites, botanical gardens, tea plantations and enjoy authentic Sri Lankan experiences.`,

  tourType: 'Round Tour',

  itinerary: [
    {
      day: 1,
      title: 'Sigiriya & Village Experience',
      activities: [
        {
          type: 'Hiking',
          title: { title: 'Sigiriya Lion Rock / Pidurangala', icon: 'fa-mountain', color: '#f39c12' },
          description: 'Climb the iconic Sigiriya Rock Fortress or enjoy panoramic views from Pidurangala.',
          image: 'assets/img/5daysTours/c8dyxgodivrwf4hxzziq.jpg',
        },
        {
          type: 'Cultural Visit',
          title: { title: 'Dambulla Cave Temple & Golden Buddha', icon: 'fa-place-of-worship', color: '#2980b9' },
          description: 'Visit the UNESCO-listed cave temple with ancient Buddha statues and murals.',
          image: 'assets/img/SixdaysTous/4.jpg',
        },
        {
          type: 'Village Experience',
          title: { title: 'Hiriwadunna Village Tour', icon: 'fa-leaf', color: '#27ae60' },
          description: 'Experience traditional village life with local food and activities.',
          image: 'assets/img/5daysTours/34.jpg',
        },
        {
          type: 'Safari',
          title: { title: 'Habarana Elephant Safari (Eco Park)', icon: 'fa-paw', color: '#16a085' },
          description: 'Enjoy a jeep safari to see elephants in their natural habitat.',
          image: 'assets/img/5daysTours/34.jpg',
        },
        {
          type: 'Accommodation',
          title: { title: 'Overnight Stay – Sigiriya', icon: 'fa-bed', color: '#8e44ad' },
          description: 'Stay overnight in a 4-star hotel with dinner and breakfast.',
          image: 'assets/img/2daysTours/hotel.jpg',
        }
      ],
    },

    {
      day: 2,
      title: 'Kandy Cultural & Tea Experience',
      activities: [
        {
          type: 'Cultural Visit',
          title: { title: 'Matale Hindu Kovil', icon: 'fa-place-of-worship', color: '#e74c3c' },
          description: 'Visit the colorful and historic Hindu temple in Matale.',
          image: 'assets/img/5daysTours/b2qacfr5t6j0obdyl7bb.jpg',
        },
        {
          type: 'Spice Experience',
          title: { title: 'Ayurveda Herbal & Spice Garden', icon: 'fa-leaf', color: '#27ae60' },
          description: 'Learn about Sri Lankan spices and traditional herbal medicine.',
          image: 'assets/img/5daysTours/43.jpg',
        },
        {
          type: 'Cultural Visit',
          title: { title: 'Temple of the Tooth / Nelligala Temple', icon: 'fa-place-of-worship', color: '#d35400' },
          description: 'Visit sacred Buddhist temples in Kandy.',
          image: 'assets/img/5daysTours/4.jpg',
        },
        {
          type: 'Garden Visit',
          title: { title: 'Peradeniya Botanical Garden', icon: 'fa-tree', color: '#2ecc71' },
          description: 'Explore Sri Lanka’s largest botanical garden.',
          image: 'assets/img/5daysTours/26.jpg',
        },
        {
          type: 'Cultural Experience',
          title: { title: 'Batik & Saree Factory', icon: 'fa-tshirt', color: '#9b59b6' },
          description: 'See how traditional Sri Lankan batik and sarees are made.',
          image: 'assets/img/2daysTours/18.jpg',
        },
        {
          type: 'Wildlife Experience',
          title: { title: 'Elephant Experience', icon: 'fa-paw', color: '#16a085' },
          description: 'Enjoy elephant feeding, bathing, riding and photos.',
          image: 'assets/img/2daysTours/7.jpg',
        },
        {
          type: 'Tea Experience',
          title: { title: 'Ceylon Tea Plantation & Factory', icon: 'fa-leaf', color: '#27ae60' },
          description: 'Discover how world-famous Ceylon tea is produced.',
          image: 'assets/img/2daysTours/17.jpg',
        }
      ],
    },
  ],

  includes: [
    'Air-conditioned private vehicle with hotel pickup & drop-off',
    'Professional driver/guide (English, Russian, German, Hindi)',
    'Licensed guides for Sigiriya Rock, Kandy Temple & Botanical Garden',
    '4-star hotel accommodation (breakfast & dinner included)',
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
        this.multiDayTours = await this.loadToursWithPrices(toursData.multiDayTours);
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
        next: (data: any) => resolve(data?.price?.[1] ?? 0),
        error: () => {
          this.http.get(defaultFile).subscribe({
            next: (data: any) => resolve(data?.price?.[1] ?? 0),
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
      const barcode = 'twodaystours';
      localStorage.setItem('tour', JSON.stringify(this.tour));
      localStorage.setItem('filecode', barcode);
      localStorage.setItem('image', this.images[0]);

      this.router.navigate(['/booking'], {
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
