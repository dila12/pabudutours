import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  TourDetails,
  TourDetailsComponent,
} from '../../../../sharedComponents/tour-details-component/tour-details-component';
import { PackageItemComponent } from '../../../../sharedComponents/package-item-component/package-item-component';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../../../Services/country.service';
import toursData from '../../../../databaseJson/tours.json';

@Component({
  selector: 'app-three-days-tours',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TourDetailsComponent,
    PackageItemComponent,
  ],
  templateUrl: './three-days-tours.html',
  styleUrl: './three-days-tours.css',
})
export class ThreeDaysTours {
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
    title:
      'Sigiriya, Kandy, Nuwara Eliya & Ella 3 Day Tour – Yala Safari & Scenic Train Ride',

    description:
      'Explore Sri Lanka’s cultural sites, hill country, tea plantations, Ella highlights and enjoy an exciting Yala or Udawalawa safari in this 3-day private tour.',

    duration: '3 Days',
    persons: 'Private Tour (1-20 Persons)',
    filecode: '3-day-sigiriya-kandy-ella-yala-tour',

    overview: `Experience the best of Sri Lanka in 3 days. Visit Sigiriya Rock, Dambulla Cave Temple and enjoy a traditional village tour. Explore Kandy cultural sites and stay overnight. Continue to Nuwara Eliya and Ella with tea plantations, scenic views and famous train ride. End your journey with an exciting safari in Yala or Udawalawa National Park.`,

    tourType: 'Round Tour',

    itinerary: [
      {
        day: 1,
        title: 'Sigiriya & Kandy Cultural Tour',
        activities: [
          {
            type: 'Hiking',
            title: {
              title: 'Sigiriya Lion Rock / Pidurangala',
              icon: 'fa-mountain',
              color: '#f39c12',
            },
            description:
              'Climb the world-famous Sigiriya Lion Rock, a UNESCO World Heritage Site known for its ancient frescoes, mirror wall and breathtaking views from the summit. Alternatively, hike Pidurangala Rock for a more adventurous experience and enjoy panoramic views of Sigiriya surrounded by lush jungle landscapes.',
              image: 'assets/img/2daysTours/imbkh8kscrihzyrtdllf.jpg',
          },
          {
            type: 'Cultural Visit',
            title: {
              title: 'Dambulla Cave Temple & Golden Buddha',
              icon: 'fa-place-of-worship',
              color: '#2980b9',
            },
            description:
              'Explore the sacred Dambulla Cave Temple complex featuring ancient Buddhist statues, intricate murals and five historic caves carved into rock. Visit the impressive Golden Buddha statue and enjoy stunning views of the surrounding countryside.',
              image: 'assets/img/SixdaysTous/4.jpg',
          },
          {
            type: 'Village Experience',
            title: {
              title: 'Habarana Village Tour',
              icon: 'fa-leaf',
              color: '#27ae60',
            },
            description:
              'Experience authentic Sri Lankan village life with a traditional tour including a bullock cart ride, canoe ride across a serene lake and a home-cooked village lunch prepared with fresh local ingredients.',
              image: 'assets/img/5daysTours/34.jpg',
          },
          {
            type: 'Cultural Visit',
            title: {
              title: 'Matale Hindu Kovil',
              icon: 'fa-place-of-worship',
              color: '#e74c3c',
            },
            description:   'Visit the colorful Matale Hindu Kovil, famous for its intricate Dravidian architecture and vibrant sculptures, offering insight into Sri Lanka’s rich Hindu cultural heritage.',
            image: 'assets/img/5daysTours/b2qacfr5t6j0obdyl7bb.jpg',
          },
          {
            type: 'Spice Experience',
            title: {
              title: 'Spice & Ayurveda Garden',
              icon: 'fa-leaf',
              color: '#27ae60',
            },
            description: 'Discover Sri Lanka’s world-famous spices and traditional Ayurvedic treatments. Learn how spices like cinnamon, cardamom and pepper are grown and used for cooking and natural medicine.',
            image: 'assets/img/5daysTours/kt2ugiesd68bdog5kdab.jpg',
          },
          {
            type: 'Cultural Show',
            title: {
              title: 'Kandy Cultural Dance Show',
              icon: 'fa-music',
              color: '#8e44ad',
            },
            description: 'Enjoy a vibrant Kandyan cultural dance performance featuring traditional drumming, fire dancing and stunning costumes that reflect Sri Lanka’s rich artistic heritage.',
            image: 'assets/img/5daysTours/fifyrnqt5tvouhpgh6kk.jpg',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Overnight Stay – Kandy (4 Star Hotel)',
              icon: 'fa-bed',
              color: '#16a085',
            },
            description:
              'Stay overnight in a 4-star hotel with dinner and breakfast.',
            image: 'assets/img/2daysTours/hotel.jpg',
          },
        ],
      },

      {
        day: 2,
        title: 'Kandy to Nuwara Eliya & Ella',
        activities: [
          {
            type: 'Cultural Visit',
            title: {
              title: 'Temple of the Tooth / Nelligala Temple',
              icon: 'fa-place-of-worship',
              color: '#d35400',
            },
            description: 'Visit the sacred Temple of the Tooth Relic, one of the most important Buddhist sites in the world, or explore the peaceful Nelligala Temple with breathtaking hilltop views.',
            image: 'assets/img/5daysTours/4.jpg',
          },
          {
            type: 'Garden Visit',
            title: {
              title: 'Peradeniya Botanical Garden',
              icon: 'fa-tree',
              color: '#2ecc71',
            },
            description:'Walk through the beautiful Royal Botanical Garden featuring rare plants, giant bamboo trees, orchid collections and scenic landscapes along the Mahaweli River.',
            image: 'assets/img/5daysTours/26.jpg',
          },
          {
            type: 'Wildlife Experience',
            title: {
              title: 'Pinnawala Elephant Orphanage',
              icon: 'fa-paw',
              color: '#16a085',
            },
            description: 'Observe rescued elephants as they are fed and bathed in the river, offering a unique opportunity to see these gentle giants up close.',
            image: 'assets/img/5daysTours/7.jpg',
          },
          {
            type: 'Tea Experience',
            title: {
              title: 'Tea Plantation & Factory',
              icon: 'fa-leaf',
              color: '#27ae60',
            },
            description:   'Visit a traditional tea plantation and factory to see how world-famous Ceylon tea is produced, from leaf picking to processing, with a chance to taste fresh tea.',
            image: 'assets/img/5daysTours/28.png',
          },
          {
            type: 'Scenic Visit',
            title: {
              title: 'Ambuluwawa Tower',
              icon: 'fa-mountain',
              color: '#9b59b6',
            },
            description:  'Climb the unique spiral tower of Ambuluwawa for breathtaking 360-degree views of mountains, forests and surrounding landscapes.',
            image: 'assets/img/5daysTours/12.jpg',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Overnight Stay – Ella',
              icon: 'fa-bed',
              color: '#16a085',
            },
            description: 'Stay overnight in Ella with scenic views.',
            image: 'assets/img/2daysTours/hotel.jpg',
          },
        ],
      },

      {
        day: 3,
        title: 'Ella Highlights & Safari',
        activities: [
          {
            type: 'Scenic Visit',
            title: {
              title: 'Nine Arch Bridge',
              icon: 'fa-archway',
              color: '#16a085',
            },
            description:'Visit the iconic Nine Arch Bridge, one of Sri Lanka’s most photographed landmarks, set amidst lush green tea plantations.',
            image: 'assets/img/5daysTours/3.jpeg',
          },
          {
            type: 'Train Experience',
            title: {
              title: 'Ella Train Ride',
              icon: 'fa-train',
              color: '#8e44ad',
            },
            description:   'Enjoy one of the most scenic train journeys in the world, passing through misty mountains, tea plantations and breathtaking landscapes.',
            image: 'assets/img/5daysTours/6.jpeg',
          },
          {
            type: 'Waterfall Visit',
            title: {
              title: 'Ravana Falls',
              icon: 'fa-water',
              color: '#2980b9',
            },
            description:'Stop at the beautiful Ravana Falls, a popular natural attraction where you can relax and enjoy the cascading water surrounded by jungle scenery.',
            image: 'assets/img/5daysTours/11.jpg',
          },
          {
            type: 'Safari',
            title: {
              title: 'Yala / Udawalawa Safari',
              icon: 'fa-paw',
              color: '#27ae60',
            },
            description:
              'Experience an exciting jeep safari in Yala or Udawalawa National Park, where you can spot elephants, leopards, crocodiles and a wide variety of wildlife in their natural habitat.',
            image: 'assets/img/5daysTours/37.jpg',
          },
        ],
      },
    ],

    includes: [
      'Air-conditioned private vehicle with hotel pickup & drop-off',
      'Experienced driver/guide (English, Russian, German, French, Hindi)',
      'Licensed guides for Sigiriya, Kandy Temple & Botanical Garden',
      'Free tuk tuk service (Nine Arch Bridge & Ambuluwawa)',
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
      const barcode = '3-day-sigiriya-kandy-ella-yala-tour';
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
