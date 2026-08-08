import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Destination {
  name: string;
  region: string;
  summary: string;
  highlights: string[];
  tourPath: string;
  tourLabel: string;
  imageBase: string;
  imageAlt: string;
}

@Component({
  selector: 'app-destination-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './destination-component.html',
  styleUrl: './destination-component.css',
})
export class DestinationComponent {
  readonly destinations: Destination[] = [
    {
      name: 'Sigiriya',
      region: 'Cultural Triangle',
      summary:
        'Sigiriya Lion Rock is Sri Lanka’s most famous fortress palace, with frescoes, lion-paw terraces and water gardens. Most private itineraries pair it with Dambulla Cave Temple and a village or elephant stop in Habarana.',
      highlights: ['Lion Rock climb', 'Dambulla Cave Temple', 'Habarana village safari'],
      tourPath: '/sigiriya-day-tour',
      tourLabel: 'Sigiriya day tour',
      imageBase: 'assets/img/destination-1',
      imageAlt: 'Sigiriya Lion Rock Sri Lanka',
    },
    {
      name: 'Kandy',
      region: 'Hill capital',
      summary:
        'Kandy is the island’s cultural heart and home to the Temple of the Tooth Relic. A private day from the west coast usually includes Peradeniya Botanical Garden, a tea factory and optional Pinnawala elephants.',
      highlights: ['Temple of the Tooth', 'Peradeniya gardens', 'Tea country views'],
      tourPath: '/kandy-day-tour',
      tourLabel: 'Kandy day tour',
      imageBase: 'assets/img/destination-4',
      imageAlt: 'Kandy Temple of the Tooth Sri Lanka',
    },
    {
      name: 'Ella',
      region: 'Hill country',
      summary:
        'Ella is the highlight of Sri Lanka’s tea country: Nine Arch Bridge, Little Adam’s Peak and the scenic train through misty valleys. It sits naturally on 2–7 day private round tours between Kandy and the south.',
      highlights: ['Nine Arch Bridge', 'Little Adam’s Peak', 'Scenic hill-country train'],
      tourPath: '/ella-day-tour',
      tourLabel: 'Ella day tour',
      imageBase: 'assets/img/destination-2',
      imageAlt: 'Ella Nine Arches Bridge Sri Lanka',
    },
    {
      name: 'Yala & Udawalawa',
      region: 'Wildlife parks',
      summary:
        'Yala is known for leopard sightings; Udawalawa is the most reliable park for Asian elephants. Private jeep safaris and the Udawalawa Elephant Transit Home are easy to add to south-coast or multi-day tours.',
      highlights: ['Yala leopard safari', 'Udawalawa elephants', 'Elephant Transit Home'],
      tourPath: '/udawalawa-day-tour',
      tourLabel: 'Udawalawa safari day tour',
      imageBase: 'assets/img/destination-3',
      imageAlt: 'Yala National Park safari Sri Lanka',
    },
    {
      name: 'Galle & south coast',
      region: 'UNESCO fort & beaches',
      summary:
        'Galle Fort is a walkable Dutch-era old town of ramparts, cafés and boutique streets. Combine it with Unawatuna, jungle beaches or a Bentota tuk-tuk ride on a south-coast day from Kalutara or Colombo.',
      highlights: ['Galle Fort ramparts', 'South-coast beaches', 'Bentota tuk tuk'],
      tourPath: '/galle-day-tour',
      tourLabel: 'Galle day tour',
      imageBase: 'assets/img/destination-6',
      imageAlt: 'Galle Fort Sri Lanka',
    },
    {
      name: 'Dambulla',
      region: 'Golden Cave Temple',
      summary:
        'Dambulla’s UNESCO cave temples sit on the road between Colombo and Sigiriya. Most Cultural Triangle days include both the caves and Lion Rock, so you see Sri Lanka’s two headline heritage sites in one private outing.',
      highlights: ['Cave temple complex', 'Easy combo with Sigiriya', 'Cultural Triangle gateway'],
      tourPath: '/sigiriya-day-tour',
      tourLabel: 'Sigiriya & Dambulla day tour',
      imageBase: 'assets/img/destination-5',
      imageAlt: 'Dambulla Cave Temple Sri Lanka',
    },
  ];
}
