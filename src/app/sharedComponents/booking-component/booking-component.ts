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
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environment';
import countriesData from './../../../assets/data/countries.json';
import countryCode from './../../../assets/data/countryCode.json';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from '../../Services/country.service';
import { TourPriceService } from '../../Services/tour-price.service';

@Component({
  selector: 'app-booking-component',
  standalone: true,
  imports: [CommonModule, FormsModule, NgTemplateOutlet, TranslatePipe],
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
  @Output() bookingComplete = new EventEmitter<void>();
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
  isSubmitting = false;
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
    if (this.isSubmitting) {
      return;
    }

    if (!this.agreeTerms) {
      this.toastr.warning('Please agree to the terms & conditions.', 'Required');
      return;
    }

    if (!this.validateTravelDate(this.travelDate)) {
      this.toastr.warning(this.dateError || 'Please select a valid travel date.', 'Invalid date');
      return;
    }

    if (!this.firstName?.trim() || !this.email?.trim()) {
      this.toastr.warning('Please fill in your name and email.', 'Required');
      return;
    }

    const bookingDetails = {
      firstName: this.firstName.trim(),
      lastName: (this.lastName || '').trim(),
      email: this.email.trim(),
      phone: this.fullPhone,
      country: this.country,
      travelers: this.travelers,
      tour: {
        title: this.tour?.title,
        duration: this.tour?.duration,
        tourType: this.tour?.tourType,
        filecode: this.filecode || this.tour?.filecode,
      },
      orderNumber: this.orderNumber,
      total: this.total,
      bookingDate: this.bookingDate?.toISOString?.() || this.bookingDate,
      travelDate: this.travelDate ? this.formatDateInput(this.travelDate) : null,
    };

    this.isSubmitting = true;
    this.toastr.info('Processing your booking...', 'Please wait');
    this.http
      .post(`${environment.backendUrl}/send-booking-email`, bookingDetails)
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.toastr.success(
            'Your booking has been completed successfully!',
            'Booking Confirmed',
          );
          setTimeout(() => {
            this.bookingCompleted = true;
            this.bookingComplete.emit();
          }, 800);
        },
        error: (err) => {
          this.isSubmitting = false;
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

    const travelDateLabel = this.travelDate
      ? this.travelDate.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : '—';
    const bookedOn = this.bookingDate.toLocaleString('en-GB', {
      timeZone: 'Asia/Colombo',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      this.toastr.warning(
        'Please allow pop-ups to print or download your invoice.',
        'Popup blocked',
      );
      return;
    }

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Invoice ${this.orderNumber} – Pabudu Tours</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px;
      font-family: Arial, Helvetica, sans-serif;
      color: #1a1a1a;
      background: #fff;
    }
    .sheet { max-width: 720px; margin: 0 auto; }
    .top {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: flex-start;
      border-bottom: 3px solid #012c13;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    .brand { color: #012c13; }
    .brand h1 { margin: 0; font-size: 24px; }
    .brand p { margin: 4px 0 0; color: #666; font-size: 13px; }
    .badge {
      background: #012c13;
      color: #fff;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }
    h2 {
      margin: 0 0 12px;
      color: #012c13;
      font-size: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18px;
    }
    th, td {
      text-align: left;
      padding: 10px 12px;
      border-bottom: 1px solid #e8ebe9;
      vertical-align: top;
      font-size: 14px;
    }
    th {
      width: 34%;
      color: #666;
      font-weight: 600;
      background: #f6f8f7;
    }
    .total td {
      background: rgba(184, 149, 74, 0.12);
      font-size: 16px;
      font-weight: 700;
      color: #012c13;
      border-bottom: 0;
    }
    .note {
      margin-top: 24px;
      padding: 12px 14px;
      background: #f6f8f7;
      border-radius: 8px;
      color: #555;
      font-size: 13px;
      line-height: 1.5;
    }
    .footer {
      margin-top: 28px;
      padding-top: 14px;
      border-top: 1px solid #e8ebe9;
      color: #777;
      font-size: 12px;
      line-height: 1.5;
    }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="top">
      <div class="brand">
        <h1>Pabudu Tours</h1>
        <p>Private Sri Lanka tours · Forever Unforgettable</p>
      </div>
      <div class="badge">INVOICE</div>
    </div>

    <h2>Booking details</h2>
    <table>
      <tr><th>Order number</th><td>${this.escapeHtml(this.orderNumber)}</td></tr>
      <tr><th>Booked on</th><td>${this.escapeHtml(bookedOn)}</td></tr>
      <tr><th>Tour</th><td>${this.escapeHtml(this.tour?.title || '')}</td></tr>
      <tr><th>Duration</th><td>${this.escapeHtml(this.tour?.duration || '')}</td></tr>
      <tr><th>Travel date</th><td>${this.escapeHtml(travelDateLabel)}</td></tr>
      <tr><th>Guest</th><td>${this.escapeHtml(`${this.firstName} ${this.lastName}`.trim())}</td></tr>
      <tr><th>Email</th><td>${this.escapeHtml(this.email)}</td></tr>
      <tr><th>Phone</th><td>${this.escapeHtml(this.fullPhone || '—')}</td></tr>
      <tr><th>Country</th><td>${this.escapeHtml(this.country || '—')}</td></tr>
      <tr><th>Travelers</th><td>${this.escapeHtml(String(this.travelers))}</td></tr>
      <tr><th>Payment</th><td>Payment later at destination</td></tr>
      <tr class="total"><th>Total</th><td>$${Number(this.total || 0).toFixed(2)}</td></tr>
    </table>

    <div class="note">
      A confirmation email has also been sent to your inbox.
      Our team will contact you shortly with travel arrangements.
    </div>

    <div class="footer">
      Pabudu Tours<br/>
      No: 439/2 Managala Rd, Kuda Waskaduwa, Waskaduwa, Kalutara, Sri Lanka<br/>
      WhatsApp: +94 77 900 88 03 · Email: Pabudutour@gmail.com
    </div>
  </div>
  <script>
    window.onload = function () {
      window.focus();
      window.print();
    };
  </script>
</body>
</html>`);
    printWindow.document.close();
  }

  private escapeHtml(value: string): string {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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
