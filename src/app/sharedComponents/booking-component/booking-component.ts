import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import countriesData from './../../../assets/data/countries.json';
import countryCode from './../../../assets/data/countryCode.json';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from '../../Services/country.service';
import { TourPriceService } from '../../Services/tour-price.service';

@Component({
  selector: 'app-booking-component',
  standalone: true,
  imports: [CommonModule, FormsModule, NgTemplateOutlet],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.css',
})
export class BookingComponent implements OnInit, OnChanges, OnDestroy {
  /** When true, renders compact form for tour detail sidebars */
  @Input() embedMode = false;
  /** Viator-style sticky sidebar card layout */
  @Input() sidebarLayout = false;
  @Input() displayPrice: number | string = 0;
  @Input() filecodeInput = '';
  @Input() tourInput: any = null;
  @Input() imageInput = '';
  /** Hide the inline total row when the parent booking card already shows it. */
  @Input() hideInlineTotal = false;
  @Output() quoteChange = new EventEmitter<{ total: number; travelers: number }>();
  showGuestDetails = false;

  tour: any = {
    title: 'Tour',
    price: 0,
    duration: 'N/A',
    tourType: 'N/A',
  };
  travelers = 1;
  amountPaid = 0;
  orderNumber = '';
  prices: any = {};
  subtotal = 0;
  total = 0;
  filecode = '';
  image = '';
  bookingCompleted = false;
  bookingDate: Date = new Date();
  travelDate: Date | null = null;
  firstName = '';
  lastName = '';
  email = '';
  country = '';
  countries: string[] = [];
  countriesList = countryCode;
  selectedCountry = this.countriesList.find((c) => c.code === 'LK');
  phoneNumber = '';
  userCountry = 'US';
  groupNotice = '';
  dateError = '';
  agreeTerms = false;
  private isBrowser: boolean;
  private initialized = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private tourPriceService: TourPriceService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit() {
    this.countries = countriesData.countries;

    if (!this.isBrowser) {
      return;
    }

    this.userCountry = await this.countryService.detectCountry();
    this.generateOrderNumber();

    if (this.embedMode) {
      this.applyEmbedInputs();
      this.initialized = true;
      return;
    }

    this.route.paramMap.subscribe((params) => {
      const code = params.get('filecode');
      if (code) {
        this.filecode = code;
        this.loadTourPrices(this.filecode);
      }
    });

    const navState = history.state as {
      tour?: any;
      barcode?: string;
      image?: string;
      Image?: string;
    };

    if (navState?.tour) {
      this.tour = navState.tour;
      this.filecode = navState.barcode || this.filecode;
      this.image = navState.image || navState.Image || '';
      this.persistBookingState();
    } else {
      const storedTour = localStorage.getItem('tour');
      const storedFilecode = localStorage.getItem('filecode');
      const storedImage = localStorage.getItem('image');

      if (storedTour && storedFilecode) {
        this.tour = JSON.parse(storedTour);
        this.filecode = storedFilecode;
        this.image = storedImage || '';
      }
    }

    if (this.filecode) {
      this.loadTourPrices(this.filecode);
    }

    this.initialized = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.embedMode || !this.isBrowser) {
      return;
    }
    if (
      changes['filecodeInput'] ||
      changes['tourInput'] ||
      changes['imageInput']
    ) {
      this.applyEmbedInputs();
    }
  }

  private applyEmbedInputs() {
    if (this.tourInput) {
      this.tour = { ...this.tourInput };
    }
    if (this.imageInput) {
      this.image = this.imageInput;
    }
    if (this.filecodeInput) {
      this.filecode = this.filecodeInput;
      this.loadTourPrices(this.filecode);
    }
  }

  get fullPhone(): string {
    return this.selectedCountry
      ? `${this.selectedCountry.dial_code}${this.phoneNumber}`
      : this.phoneNumber;
  }

  async loadTourPrices(fileName: string) {
    if (!fileName || !this.isBrowser) {
      return;
    }

    const data = await this.tourPriceService.loadTourPriceFile(
      fileName,
      this.userCountry,
    );

    if (!data) {
      this.toastr.error('Unable to load tour pricing.', 'Pricing Error');
      return;
    }

    this.prices = data.price || {};
    this.tour = {
      ...this.tour,
      title: data.title || this.tour.title,
      duration: data.duration || this.tour.duration,
      tourType: data.tourType || this.tour.tourType,
      overview: data.overview || this.tour.overview,
      price: data.price?.['2'] ?? this.tour.price,
    };
    if (data.images?.[0] && !this.embedMode) {
      this.image = data.images[0];
    }
    if (!this.embedMode) {
      this.persistBookingState();
    }
    this.updateAmounts();
  }

  private persistBookingState() {
    if (!this.isBrowser) return;
    localStorage.setItem('tour', JSON.stringify(this.tour));
    localStorage.setItem('filecode', this.filecode);
    localStorage.setItem('image', this.image || '');
    localStorage.setItem('prices', JSON.stringify(this.prices));
  }

  generateOrderNumber() {
    if (!this.isBrowser) {
      return;
    }
    let lastOrder = localStorage.getItem('lastOrderNumber');
    let newOrder = 1;

    if (lastOrder) {
      newOrder = parseInt(lastOrder, 10) + 1;
    }

    localStorage.setItem('lastOrderNumber', newOrder.toString());

    const now = new Date();
    const datePart = now.toISOString().slice(2, 10).replace(/-/g, '');
    this.orderNumber = `#${datePart}-${newOrder.toString().padStart(6, '0')}`;
  }

  get maxTravelers(): number {
    const fromTour = Number(this.tour?.maxPersons);
    if (Number.isFinite(fromTour) && fromTour >= 1) {
      return fromTour;
    }
    return 20;
  }

  updateTravelers(event: any) {
    const value = parseInt(event.target.value, 10);
    const raw = isNaN(value) || value < 1 ? 1 : value;
    this.travelers = Math.min(raw, this.maxTravelers);
    this.updateAmounts();

    if (this.maxTravelers <= 3 && raw > this.maxTravelers) {
      this.groupNotice = `This tuk tuk ride is limited to ${this.maxTravelers} persons maximum.`;
    } else if (this.travelers >= 7) {
      this.groupNotice =
        'For groups of 7 or more travelers, please contact Pabudutour@gmail.com for a customized group tour arrangement.';
    } else {
      this.groupNotice = '';
    }
  }


  updateAmounts() {
    if (this.prices && this.prices[this.travelers]) {
      this.subtotal = this.prices[this.travelers];
    } else {
      this.subtotal = 0;
    }
    this.total = this.subtotal;
    this.quoteChange.emit({ total: this.total, travelers: this.travelers });
  }

  get amountDue() {
    return this.total - this.amountPaid;
  }

  /** Day tours may book today; round/multi-day tours start from tomorrow. Past dates never allowed. */
  get isDayTour(): boolean {
    const type = String(this.tour?.tourType || '').toLowerCase();
    const duration = String(this.tour?.duration || '').toLowerCase();
    return (
      type.includes('day tour') ||
      type.includes('tuk tuk') ||
      duration.includes('1 day') ||
      duration === '1 day' ||
      duration.includes('hour')
    );
  }


  get minTravelDate(): string {
    return this.formatDateInput(this.earliestAllowedDate());
  }

  get isTravelDateValid(): boolean {
    return !!this.travelDate && !this.dateError && this.isDateAllowed(this.travelDate);
  }

  private startOfToday(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private earliestAllowedDate(): Date {
    const today = this.startOfToday();
    if (this.isDayTour) {
      return today;
    }
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  private formatDateInput(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private parseDateInput(dateString: string): Date | null {
    if (!dateString) return null;
    const parts = dateString.split('-').map(Number);
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
    const [y, m, d] = parts;
    const date = new Date(y, m - 1, d);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  private isDateAllowed(date: Date): boolean {
    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);
    return selected.getTime() >= this.earliestAllowedDate().getTime();
  }

  private validateTravelDate(date: Date | null): boolean {
    if (!date) {
      this.dateError = 'Please select a travel date.';
      return false;
    }

    const today = this.startOfToday();
    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    if (selected.getTime() < today.getTime()) {
      this.dateError = 'Past dates cannot be booked. Please choose a valid travel date.';
      return false;
    }

    if (!this.isDayTour && selected.getTime() === today.getTime()) {
      this.dateError = 'Same-day booking is only available for day tours. Please choose tomorrow or later.';
      return false;
    }

    this.dateError = '';
    return true;
  }

  completeBooking() {
    if (!this.agreeTerms) {
      this.toastr.warning('Please agree to the terms & conditions.', 'Required');
      return;
    }

    if (!this.validateTravelDate(this.travelDate)) {
      this.toastr.warning(this.dateError || 'Please select a valid travel date.', 'Invalid date');
      return;
    }

    const bookingDetails = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.fullPhone,
      country: this.country,
      travelers: this.travelers,
      tour: this.tour,
      orderNumber: this.orderNumber,
      total: this.total,
      bookingDate: this.bookingDate,
      travelDate: this.travelDate,
    };

    this.toastr.info('Processing your booking...', 'Please wait');
    this.http
      .post(`${environment.backendUrl}/send-booking-email`, bookingDetails)
      .subscribe({
        next: () => {
          this.toastr.success(
            'Your booking has been completed successfully!',
            'Booking Confirmed',
          );
          setTimeout(() => {
            this.bookingCompleted = true;
          }, 800);
        },
        error: (err) => {
          console.error('Email error:', err);
          this.toastr.error(
            'There was an error processing your booking. Please try again later.',
            'Booking Failed',
          );
        },
      });
  }

  printInvoice() {
    if (!this.isBrowser) return;
    const printContents = document.getElementById('invoiceContent')?.innerHTML;

    if (printContents) {
      const printWindow = window.open('', '', 'height=700,width=900');
      printWindow!.document.write(`
      <html>
        <head>
          <title>Booking Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .card { box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 20px; border-radius: 10px; }
            .list-group-item { border: none; border-bottom: 1px solid #eee; padding: 10px 0; }
            .text-center { text-align: center; }
            .fw-bold { font-weight: bold; }
            .text-success { color: green; }
            .text-danger { color: red; }
            .text-primary { color: #007bff; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
      printWindow!.document.close();
      printWindow!.print();
    }
  }

  onTravelDateChange(dateString: string) {
    const parsed = this.parseDateInput(dateString);
    if (!parsed) {
      this.travelDate = null;
      this.dateError = 'Please select a travel date.';
      this.showGuestDetails = false;
      return;
    }

    if (!this.validateTravelDate(parsed)) {
      this.travelDate = null;
      this.showGuestDetails = false;
      this.toastr.warning(this.dateError, 'Invalid date');
      return;
    }

    this.travelDate = parsed;
  }

  ngOnDestroy() {
    if (!this.isBrowser || this.embedMode) return;
    localStorage.removeItem('tour');
    localStorage.removeItem('filecode');
    localStorage.removeItem('prices');
  }
}
