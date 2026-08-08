import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.css',
})
export class Testimonial {
  readonly tripadvisorUrl =
    'https://www.tripadvisor.com/Attraction_Review-g304136-d34261425-Reviews-Pabudu_Tours-Kalutara_Western_Province.html';
  readonly googleUrl = 'https://share.google/ZUplfSNRQT7GHlgMn';

  readonly reviews = [
    {
      name: 'Sri Lanka With Roshan',
      author: 'XCOUNTRYTO',
      date: 'April 28, 2025',
      comment:
        'We had a really wonderful time in Sri Lanka. We booked just the car with driver and made our own hotel bookings. The tour was quite flexible and everything was organised smoothly.',
      photo: 'assets/img/testimonial-1.jpg',
    },
    {
      name: 'Unforgettable Experience!',
      author: 'JEN2SG',
      date: 'April 28, 2025',
      comment:
        'Excellent trip with amazing and safe driver Roshan! We loved the landscape, the friendly people and the delicious food. Highly recommended for a private Sri Lanka tour.',
      photo: 'assets/img/testimonial-2.jpg',
    },
    {
      name: 'Wonderful Travel Experience',
      author: 'MICHELA R',
      date: 'April 28, 2025',
      comment:
        'We are two Italian friends, we spent 10 days exploring Sri Lanka. Our driver, Kumara, was incredibly kind and professional from the Cultural Triangle to the south coast.',
      photo: 'assets/img/testimonial-3.jpg',
    },
    {
      name: 'Family With Little Ones In Sri Lanka',
      author: 'JOANA V',
      date: 'April 27, 2025',
      comment:
        'We had Dhana as our driver for days and he was instrumental in us having a lovely holiday! Everything with the company was super easy to arrange with children.',
      photo: 'assets/img/testimonial-4.jpg',
    },
  ];
}
