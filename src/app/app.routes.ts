import { Routes } from '@angular/router';
import { LayoutComponent } from './mainComponents/layout-component/layout-component';
import { HomePageComponent } from './mainComponents/home-page-component/home-page-component';
import { AboutComponent } from './mainComponents/about-component/about-component';
import { ServiceComponent } from './mainComponents/service-component/service-component';
import { TourPackages } from './mainComponents/tour-packages/tour-packages';
import { SevenDaysTourComponent } from './mainComponents/tour-packages/roundTours/seven-days-tour-component/seven-days-tour-component';
import { TenDaysTourComponent } from './mainComponents/tour-packages/roundTours/ten-days-tour-component/ten-days-tour-component';
import { FiveDaysTourComponent } from './mainComponents/tour-packages/roundTours/five-days-tour-component/five-days-tour-component';
import { EllaDayTourComponent } from './mainComponents/tour-packages/dayTours/ella-day-tour-component/ella-day-tour-component';
import { GalleDayTour } from './mainComponents/tour-packages/dayTours/galle-day-tour/galle-day-tour';
import { KandyDayTourComponent } from './mainComponents/tour-packages/dayTours/kandy-day-tour-component/kandy-day-tour-component';
import { SigiriyaDayTourComponent } from './mainComponents/tour-packages/dayTours/sigiriya-day-tour-component/sigiriya-day-tour-component';
import { UdawalawaDayTourComponent } from './mainComponents/tour-packages/dayTours/udawalawa-day-tour-component/udawalawa-day-tour-component';
import { MirissaDayTourComponent } from './mainComponents/tour-packages/dayTours/mirissa-day-tour-component/mirissa-day-tour-component';
import { BentotaTukTukTourComponent } from './mainComponents/tour-packages/dayTours/bentota-tuk-tuk-tour-component/bentota-tuk-tuk-tour-component';
import { BookingComponent } from './sharedComponents/booking-component/booking-component';



import { ContactUsComponent } from './sharedComponents/contact-us-component/contact-us-component';
import { DestinationComponent } from './sharedComponents/destination-component/destination-component';
import { Testimonial } from './sharedComponents/testimonial/testimonial';
import { TravelGuides } from './sharedComponents/travel-guides/travel-guides';
import { ResturantComponent } from './mainComponents/resturant-component/resturant-component';
import { TwoDaysTourPlus } from './mainComponents/tour-packages/roundTours/two-days-tour-plus/two-days-tour-plus';
import { TwoDayTourComponent } from './mainComponents/tour-packages/roundTours/two-days-tour/two-day-tour-component';
import { ThreeDaysTours } from './mainComponents/tour-packages/roundTours/three-days-tours/three-days-tours';
import { NotFoundComponent } from './sharedComponents/not-found-component/not-found-component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        data: {
          title:
            'Pabudu Tours Sri Lanka | Private & Tailor Made Sri Lanka Tours',
          description:
            'Explore Sri Lanka with private tours, tailor-made holiday packages and experienced local driver guides. Discover beaches, wildlife and cultural heritage.',
          keywords:
            'Sri Lanka private tours, Sri Lanka tour packages, tailor made Sri Lanka tours',
        },
      },
      {
        path: 'about-us',
        component: AboutComponent,
        data: {
          title: 'About Pabudu Tours | Trusted Sri Lanka Travel Agency',
          description:
            'Learn about Pabudu Tours Sri Lanka, your trusted local tour operator providing customized and private Sri Lanka tours.',
          keywords: 'Sri Lanka travel agency, Sri Lanka tour operator',
        },
      },
      {
        path: 'our-services',
        component: ServiceComponent,
        data: {
          title: 'Our Services | Pabudu Tours Sri Lanka',
          description:
            'Explore our range of services including private tours, tailor-made holiday packages, chauffeur driven round tours and day trips.',
          keywords:
            'Sri Lanka private tours, Sri Lanka tour packages, tailor made Sri Lanka tours',
        },
      },
      {
        path: 'tour-packages',
        component: TourPackages,
        data: {
          title: 'Sri Lanka Tour Packages | Private Round Tours',
          description:
            'Discover our customizable Sri Lanka tour packages including round tours, wildlife safaris and beach holidays.',
          keywords: 'Sri Lanka tour packages, Sri Lanka round tours',
        },
      },

      // ROUND TOURS (SEO OPTIMIZED)
      {
        path: '7-day-sri-lanka-tour',
        component: SevenDaysTourComponent,
        data: {
          title: '7 Days (6 Nights) Excursion in Sri Lanka | Pabudu Tours',
          description:
            'Experience the best of Sri Lanka in 7 days including Sigiriya, Kandy, Ella and Yala safari.',
          keywords: '7 day Sri Lanka tour, Sri Lanka 1 week itinerary',
        },
      },
      {
        path: '10-day-sri-lanka-tour',
        component: TenDaysTourComponent,
        data: {
          title: '10 Days / 9 Nights Excursion in Sri Lanka | Pabudu Tours',
          description:
            'Private 10-day Sri Lanka excursion covering Sigiriya, Polonnaruwa, Kandy, Ella, safari, Mirissa, Galle and Colombo with half-board hotels.',
          keywords: '10 day Sri Lanka tour, Sri Lanka 10 day itinerary, 10 days 9 nights Sri Lanka',
        },
      },
      // {
      //   path: '2-day-sri-lanka-tour',
      //   component: TwoDayTourComponent,
      //   data: {
      //     title: '2 Day Sri Lanka Tour | Quick Island Experience',
      //     description: 'Experience the highlights of Sri Lanka in just 2 days with our quick private tour package.',
      //     keywords: '2 day Sri Lanka tour, Sri Lanka 2 day itinerary'
      //   }
      // },
      {
        path: '5-day-sri-lanka-tour',
        component: FiveDaysTourComponent,
        data: {
          title: '5 Days (4 Nights) Excursion in Sri Lanka | Pabudu Tours',
          description:
            'Discover a balanced mix of cultural heritage, scenic beauty and wildlife in 5 days.',
          keywords: '5 day Sri Lanka tour, Sri Lanka 5 day itinerary',
        },
      },

      // DAY TOURS (VERY IMPORTANT KEYWORDS)
      {
        path: 'ella-day-tour',
        component: EllaDayTourComponent,
        data: {
          title: 'Ella Day Tour | Scenic Train & Nine Arch Bridge',
          description:
            'Enjoy a private Ella day tour including Nine Arch Bridge, Little Adam’s Peak and Ravana Falls.',
          keywords: 'Ella day tour, Ella private tour',
        },
      },
      {
        path: 'galle-day-tour',
        component: GalleDayTour,
        data: {
          title: 'Galle Day Tour | Galle Fort & Southern Coast',
          description:
            'Discover Galle Fort, beaches and southern coastal attractions with our private day tour.',
          keywords: 'Galle day tour, Galle fort tour',
        },
      },
      {
        path: 'kandy-day-tour',
        component: KandyDayTourComponent,
        data: {
          title: '1 Day Kandy Excursion | Pabudu Tours',
          description:
            'Private 1 day Kandy excursion: Temple of the Tooth or Nelligala, Peradeniya Botanical Garden, tea factory, Pinnawala elephants, Ayurveda garden and batik factory.',
          keywords: '1 day Kandy excursion, Kandy day tour, Kandy private tour',
        },
      },
      {
        path: 'sigiriya-day-tour',
        component: SigiriyaDayTourComponent,
        data: {
          title: '1 Day Sigiriya Excursion | Pabudu Tours',
          description:
            'Private 1 day Sigiriya excursion: Lion Rock, Dambulla Cave Temple, Habarana village safari and Habarana elephant eco park safari.',
          keywords: '1 day Sigiriya excursion, Sigiriya day tour, Sigiriya private tour',
        },
      },
      {
        path: 'udawalawa-day-tour',
        component: UdawalawaDayTourComponent,
        data: {
          title: '1 Day Udawalawa Safari | Pabudu Tours',
          description:
            'Private Udawalawa day tour safari: 4–5 hour Udawalawa National Park jeep safari and Udawalawa baby elephant transit home.',
          keywords: 'Udawalawa safari, Udawalawa day tour, Udawalawe safari, baby elephant transit',
        },
      },
      {
        path: 'mirissa-day-tour',
        component: MirissaDayTourComponent,
        data: {
          title: 'Whale Watching at Mirissa | Pabudu Tours',
          description:
            'Private Mirissa day tour: whale watching (3–5 hours), Coconut Tree Hill, and swimming at Mirissa beach.',
          keywords: 'Mirissa whale watching, Mirissa day tour, Coconut Tree Hill, Mirissa beach',
        },
      },
      {
        path: 'bentota-tuk-tuk-tour',
        component: BentotaTukTukTourComponent,
        data: {
          title: 'Bentota Tuk Tuk Tour | Pabudu Tours',
          description:
            'Explore Bentota by tuk tuk in 2–3 hours: beach, turtle hatchery, Kande Vihara Temple, local shops and photo stops. Fuel included.',
          keywords: 'Bentota tuk tuk tour, Bentota tuk tuk ride, Bentota short tour, turtle hatchery Bentota',
        },
      },

      // OTHER PAGES



      {
        path: 'booking/:filecode',
        component: BookingComponent,
        data: {
          title: 'Book Your Sri Lanka Tour | Private & Customized Travel',
          description:
            'Book your private Sri Lanka tour with our customizable packages and expert local guides.',
          keywords: 'Sri Lanka booking, private Sri Lanka tour booking',
        },
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        data: {
          title: 'Contact Pabudu Tours Sri Lanka',
          description:
            'Get in touch with Pabudu Tours for customized Sri Lanka tour packages and private travel services.',
          keywords: 'contact Sri Lanka tour company',
        },
      },
      {
        path: 'restaurants-in-sri-lanka',
        component: ResturantComponent,
        data: {
          title: 'Restaurants in Sri Lanka | Best Local Cuisine',
          description:
            'Discover the best restaurants in Sri Lanka offering authentic local cuisine and international dishes.',
          keywords: 'Sri Lanka restaurants, best restaurants in Sri Lanka',
        },
      },
      {
        path: 'destinations-sri-lanka',
        component: DestinationComponent,
        data: {
          title: 'Sri Lanka Destinations | Beaches, Wildlife & Cultural Sites',
          description:
            'Explore the top Sri Lanka destinations including beaches, wildlife parks and cultural heritage sites.',
          keywords: 'Sri Lanka destinations, best places to visit in Sri Lanka',
        },
      },
      {
        path: 'customer-testimonials',
        component: Testimonial,
        data: {
          title: 'Customer Testimonials | Pabudu Tours Sri Lanka',
          description:
            'Read testimonials from our satisfied customers who have experienced our private Sri Lanka tours.',
          keywords: 'Sri Lanka tour testimonials, customer reviews',
        },
      },
      {
        path: 'sri-lanka-travel-guides',
        component: TravelGuides,
        data: {
          title: 'Sri Lanka Travel Guides | Expert Insights & Tips',
          description:
            'Explore our comprehensive travel guides for Sri Lanka, offering expert insights and practical tips.',
          keywords: 'Sri Lanka travel guides, Sri Lanka travel tips',
        },
      },
      {
        path: '2-day-ella-kandy-private-tour-sri-lanka',
        component: TwoDaysTourPlus,
        data: {
          title:
            '2 Day Sri Lanka Private Tour – Ella, Kandy & Udawalawa | Airport or Hotel Drop',
          description:
            'Book a 2 day Sri Lanka private tour covering Udawalawa Elephant Transit Home, Ella highlights, Ramboda Falls, Ambuluwawa Tower and Kandy Temple of the Tooth. Airport or hotel drop included.',
          keywords:
            '2 day Sri Lanka tour, Ella Kandy 2 day tour, Sri Lanka private tour, Udawalawa safari tour, Sri Lanka hill country tour',
        },
      },
      {
        path: '2-day-sigiriya-kandy-private-tour-sri-lanka',
        component: TwoDayTourComponent,
        data: {
          title:
            '2 Day Sigiriya & Kandy Private Tour | Cultural Triangle Sri Lanka',
          description:
            'Book a 2 day private Sri Lanka tour covering Sigiriya Rock Fortress, Dambulla Cave Temple, Kandy Temple of the Tooth and scenic Cultural Triangle highlights with a local chauffeur guide.',
          keywords:
            '2 day Sigiriya Kandy tour, Sigiriya Kandy private tour, Sri Lanka cultural triangle tour, 2 day Sri Lanka tour',
          ogImage: 'https://www.pabudutours.com/assets/img/mainpage/6.jpeg',
        },
      },
      {
        path: '3-day-sigiriya-kandy-ella-yala-tour',
        component: ThreeDaysTours,
        data: {
          title: '3 Day Sri Lanka Tour | Sigiriya, Kandy, Ella & Yala Safari',
          description:
            'Explore Sri Lanka in 3 days with Sigiriya Rock Fortress, Kandy cultural sites, Ella hill country, scenic train ride and Yala National Park safari.',
          keywords:
            '3 day Sri Lanka tour, Sigiriya Kandy Ella tour, Yala safari Sri Lanka, Sri Lanka 3 day itinerary',
        },
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          title: 'Page Not Found | Pabudu Tours Sri Lanka',
          description:
            'This page could not be found. Browse private Sri Lanka tours and holiday packages with Pabudu Tours.',
          robots: 'noindex, follow',
        },
      },
    ],
  },
];
