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
  selector: 'app-seven-days-tour-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TourDetailsComponent,
    PackageItemComponent,
    TourBookingSidebarComponent,
  ],
  templateUrl: './seven-days-tour-component.html',
  styleUrls: ['./seven-days-tour-component.css'],
})
export class SevenDaysTourComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/img/5daysTours/1.jpeg',
    'assets/img/5daysTours/18.jpg',
    'assets/img/5daysTours/28.png',
    'assets/img/5daysTours/24.jpg',
    'assets/img/5daysTours/34.jpg',
  ];

  currentIndex = 0;
  intervalId: any;
  multiDayTours: any[] = [];
  selectedTours: any[] = [];
  userCountry = 'US';
  price = 0;

  tour = {
    title: '7 Days (6 Nights) Excursion in Sri Lanka',
    description:
      'A private 7-day Sri Lanka excursion covering Sigiriya, Kandy, Nuwara Eliya, Ella, Yala, Mirissa and the southwest coast.',
    duration: '7 Days / 6 Nights',
    persons: '20 Persons',
    filecode: '7-day-sri-lanka-tour',
    overview: `7 Days (6 Nights) Excursion in Sri Lanka with Pabudu Tours — private chauffeur-guided travel from Colombo Airport through Sigiriya, Habarana, Matale, Kandy, Nuwara Eliya, Ella, Yala, Mirissa, Galle and Bentota, ending with airport drop-off.

First 2 days program will be change depends on your arrival time.`,
    tourType: 'Round Tour',

    itinerary: [
      {
        day: 1,
        title: 'Arrival — Colombo Airport to Sigiriya',
        activities: [
          {
            type: 'Arrival',
            title: { title: 'Airport Pickup', icon: 'fa-plane', color: '#2c3e50' },
            description:
              'Arrival to hotel from Colombo Airport to Sigiriya and relax.',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Overnight in Sigiriya',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay 1st night near Sigiriya (hotel as arranged).',
            image: 'assets/img/7dayschange/f4yqlbw3bjsz3szp3hbq.jpg',
          },
        ],
      },
      {
        day: 2,
        title: 'Sigiriya, Dambulla & Habarana',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Sigiriya Lion Rock',
              icon: 'fa-mountain',
              color: '#e74c3c',
            },
            description: 'Climb the UNESCO World Heritage Sigiriya Lion Rock fortress.',
            image: 'assets/img/7dayschange/ihyw8fdom33yg8zqkmfi.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Dambulla Cave Temple & Golden Buddha',
              icon: 'fa-place-of-worship',
              color: '#2980b9',
            },
            description:
              'Visit Dambulla Cave Temple and the Golden Buddha statue.',
            image: 'assets/img/7dayschange/d2ap1r8hoijw6wsm5xgy.jpg',
          },
          {
            type: 'Village Experience',
            title: {
              title: 'Habarana Traditional Village Safari',
              icon: 'fa-leaf',
              color: '#8e44ad',
            },
            description:
              'Habarana Sri Lankan tradition village safari.',
            image: 'assets/img/5daysTours/36.jpg',
          },
          {
            type: 'Safari',
            title: {
              title: 'Habarana Eco Park Safari',
              icon: 'fa-paw',
              color: '#27ae60',
            },
            description: 'Habarana Eco park safari.',
            image: 'assets/img/5daysTours/24.jpg',
          },
          {
            type: 'Note',
            title: {
              title: 'Arrival-time note',
              icon: 'fa-info-circle',
              color: '#c0392b',
            },
            description:
              'First 2 days program will be change depends on your arrival time.',
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
              title: 'Matale Hindu Kovil',
              icon: 'fa-place-of-worship',
              color: '#2980b9',
            },
            description: 'Visit Matale Hindu kovil.',
            image: 'assets/img/7dayschange/gt14exwu7ogp3rz9aun9.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Ayurveda Herbal Garden',
              icon: 'fa-leaf',
              color: '#2ecc71',
            },
            description: 'Ayurveda herbal garden visit.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Peradeniya Botanical Garden',
              icon: 'fa-tree',
              color: '#27ae60',
            },
            description: 'National Botanical Garden at Peradeniya.',
            image: 'assets/img/7dayschange/asojmlldivxq8vforwxt.jpg',
          },
          {
            type: 'Wildlife Experience',
            title: {
              title: 'Pinnawala Elephant Orphanage',
              icon: 'fa-paw',
              color: '#8e44ad',
            },
            description:
              'Pinnawala Elephant Orphanage or do activities with elephants (riding, feeding, bathing and take pictures with elephants).',
            image: 'assets/img/5daysTours/33.jpg',
          },
          {
            type: 'Cultural show',
            title: {
              title: 'Kandy Lake Club Cultural Show',
              icon: 'fa-theater-masks',
              color: '#e67e22',
            },
            description: 'Kandy Lake Club culture show at evening.',
            image: 'assets/img/7dayschange/upxn0ge9htdg20ycpgp6.jpg',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Overnight in Kandy',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description:
              'Stay 3rd night at Kandy Thilanka Hotel or Hill Paradise at Hanthana.',
            image: 'assets/img/7dayschange/sxapeujg7mpergbd5nic.jpg',
          },
        ],
      },
      {
        day: 4,
        title: 'Kandy to Nuwara Eliya / Ramboda',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Temple of the Tooth or Nelligala Temple',
              icon: 'fa-place-of-worship',
              color: '#2980b9',
            },
            description:
              'Kandy Temple of the Tooth Buddha or Nelligala Temple.',
            image: 'assets/img/7dayschange/f3pqyx8y4gpwmqhzleh0.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Tea Plantation & Factory',
              icon: 'fa-coffee',
              color: '#8e44ad',
            },
            description: 'Tea plantation and factory visit.',
            image: 'assets/img/7dayschange/tijr5ztiozgdesbxotm4.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Nuwara Eliya Post Office',
              icon: 'fa-landmark',
              color: '#16a085',
            },
            description: 'Visit the famous Nuwara Eliya Post Office.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Ramboda Waterfall',
              icon: 'fa-water',
              color: '#3498db',
            },
            description: 'Stop at Ramboda waterfall.',
            image: 'assets/img/7dayschange/ovdxsgglrdreodbe1tmv.jpg',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Hotel Ramboda Falls',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay 4th night at Hotel Ramboda Fall.',
            image: 'assets/img/7dayschange/zxla06noouvzn6e0teui.jpg',
          },
        ],
      },
      {
        day: 5,
        title: 'Ella Train & Yala Safari',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Famous Ella Train Ride',
              icon: 'fa-train',
              color: '#c0392b',
            },
            description: 'Scenic Ella train ride through the hill country.',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Nine Arch Bridge',
              icon: 'fa-bridge',
              color: '#e67e22',
            },
            description: 'Visit the Nine Arch Bridge.',
            image: 'assets/img/7dayschange/yka3mpx2nahiftrb0lpu.jpg',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Ravana Waterfall',
              icon: 'fa-water',
              color: '#3498db',
            },
            description: 'Stop at Ravana waterfall.',
            image: 'assets/img/7dayschange/zauxzn86ulp9ddnrzlvw.jpg',
          },
          {
            type: 'Safari',
            title: {
              title: 'Yala Evening Safari',
              icon: 'fa-paw',
              color: '#27ae60',
            },
            description: 'Yala evening safari (duration 4 hours).',
            image: 'assets/img/7dayschange/u1iadnsusjf2h8zdhma5.jpg',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Hotel Peacock at Yala',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay 5th night at Hotel Peacock at Yala.',
            image: 'assets/img/7dayschange/ipbxv6o0ovr2tfbc6pge.jpg',
          },
        ],
      },
      {
        day: 6,
        title: 'Mirissa Beach Day',
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
            type: 'Guided tour',
            title: {
              title: 'Coconut Tree Hill',
              icon: 'fa-tree',
              color: '#27ae60',
            },
            description: 'Coconut Tree Hill at Mirissa.',
          },
          {
            type: 'Activity',
            title: {
              title: 'Weligama Surfing',
              icon: 'fa-water',
              color: '#3498db',
            },
            description: 'Weligama surfing activities.',
          },
          {
            type: 'Leisure',
            title: {
              title: 'Mirissa Beach',
              icon: 'fa-umbrella-beach',
              color: '#f39c12',
            },
            description: 'Swim at beautiful beach at Mirissa.',
          },
          {
            type: 'Accommodation',
            title: {
              title: 'Hotel Mirissa',
              icon: 'fa-hotel',
              color: '#27ae60',
            },
            description: 'Stay 6th night at hotel Mirissa.',
          },
        ],
      },
      {
        day: 7,
        title: 'Galle, Bentota & Departure',
        activities: [
          {
            type: 'Guided tour',
            title: {
              title: 'Galle Dutch Fort',
              icon: 'fa-landmark',
              color: '#16a085',
            },
            description: 'Explore Galle Dutch Fort.',
            image: 'assets/img/5daysTours/32.jpg',
          },
          {
            type: 'Boat Safari',
            title: {
              title: 'Bentota or Madu River Safari',
              icon: 'fa-ship',
              color: '#3498db',
            },
            description:
              'Bentota River safari or Madu River safari (duration 1 hour).',
          },
          {
            type: 'Guided tour',
            title: {
              title: 'Moonstone Mine Village',
              icon: 'fa-gem',
              color: '#8e44ad',
            },
            description: 'Moonstone Mine village at Meetiyagoda.',
          },
          {
            type: 'Conservation',
            title: {
              title: 'Turtle Farm at Kosgoda',
              icon: 'fa-water',
              color: '#2980b9',
            },
            description: 'Turtle farm at Kosgoda.',
            image: 'assets/img/5daysTours/31.jpg',
          },
          {
            type: 'Departure',
            title: {
              title: 'Airport Drop-off',
              icon: 'fa-plane',
              color: '#2c3e50',
            },
            description:
              'Departure to your final destination (drop off to airport).',
          },
        ],
      },
    ],

    includes: [
      'Air-Conditioned Private Vehicle',
      'English Speaking Professional Driver',
      "Driver's Accommodation & Meals",
      'Pickup & Drop Off',
      'Fuel & Parking Fees',
      '24 Hours Service',
      'Unlimited Mileage/Kilometer for entire round tour',
      'Your Accommodation',
    ],
    excludes: ['Food & Drinks', 'Entrance & Activities Fees'],
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
    if (isPlatformBrowser(this.platformId)) {
      this.userCountry = await this.countryService.detectCountry();
      this.price = await this.loadPrice(this.tour.filecode);
      this.multiDayTours = await this.loadToursWithPrices(
        toursData.multiDayTours,
      );
      this.selectedTours = this.multiDayTours
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      this.intervalId = setInterval(() => this.nextImage(), 3000);
    } else {
      this.userCountry = 'US';
      this.price = 0;
      this.multiDayTours = toursData.multiDayTours.slice(0, 3);
      this.selectedTours = this.multiDayTours;
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
      const barcode = '7-day-sri-lanka-tour';
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
