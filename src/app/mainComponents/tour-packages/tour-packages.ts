import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import toursData from '../../databaseJson/tours.json';
import { PackageItemComponent } from '../../sharedComponents/package-item-component/package-item-component';
import { CountryService } from '../../Services/country.service';
import { TourPriceService } from '../../Services/tour-price.service';

@Component({
  selector: 'app-tour-packages',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, PackageItemComponent],
  templateUrl: './tour-packages.html',
  styleUrl: './tour-packages.css',
})
export class TourPackages {
  dayTours: any[] = [];
  multiDayTours: any[] = [];
  tukTukTours: any[] = [];
  userCountry = 'US';

  activeTab: 'multi' | 'day' | 'tuktuk' = 'multi';

  constructor(
    private countryService: CountryService,
    private tourPriceService: TourPriceService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  async ngOnInit() {
    this.userCountry = await this.countryService.detectCountry();
    this.dayTours = await this.loadToursWithPrices(toursData.dayTours);
    this.multiDayTours = await this.loadToursWithPrices(toursData.multiDayTours);
    this.tukTukTours = await this.loadToursWithPrices(toursData.tukTukTours ?? []);
  }

  get activeTours() {
    if (this.activeTab === 'day') return this.dayTours;
    if (this.activeTab === 'tuktuk') return this.tukTukTours;
    return this.multiDayTours;
  }

  get activeTabLabel() {
    if (this.activeTab === 'day') return 'Day Tours';
    if (this.activeTab === 'tuktuk') return 'Tuk Tuk Ride';
    return 'Multi-Day Tours';
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
    return this.tourPriceService.loadPrice(filecode, this.userCountry);
  }

  setTab(tab: 'multi' | 'day' | 'tuktuk') {
    this.activeTab = tab;
  }
}
