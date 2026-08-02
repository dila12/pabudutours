import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { BookingComponent } from '../booking-component/booking-component';

@Component({
  selector: 'app-tour-booking-sidebar',
  standalone: true,
  imports: [CommonModule, BookingComponent, TranslatePipe],
  templateUrl: './tour-booking-sidebar.html',
  styleUrl: './tour-booking-sidebar.css',
})
export class TourBookingSidebarComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) filecode!: string;
  @Input({ required: true }) tour: any;
  @Input() image = '';
  @Input() price: number | string = 0;
  @Input() persons = '';

  @HostBinding('class.has-mobile-bar')
  get hostMobileBar(): boolean {
    return this.isMobile;
  }

  isMobile = false;
  sheetOpen = false;
  quoteTotal: number | null = null;
  quoteTravelers = 1;

  private readonly isBrowser: boolean;
  private readonly topOffset = 120;
  private readonly desktopMin = 992;
  private rafId = 0;

  get displayAmount(): number | string {
    if (this.quoteTotal != null && this.quoteTotal > 0) {
      return Math.round(this.quoteTotal);
    }
    return this.price;
  }

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.syncViewportMode();
    requestAnimationFrame(() => this.updatePosition());
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.clearPosition();
    this.unlockBodyScroll();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    if (!this.isBrowser) return;
    this.syncViewportMode();
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.updatePosition());
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.sheetOpen) this.closeSheet();
  }

  openSheet(): void {
    this.sheetOpen = true;
    this.lockBodyScroll();
  }

  closeSheet(): void {
    this.sheetOpen = false;
    this.unlockBodyScroll();
  }

  onQuoteChange(quote: { total: number; travelers: number }): void {
    this.quoteTotal = quote.total;
    this.quoteTravelers = quote.travelers || 1;
  }

  private syncViewportMode(): void {
    const mobile = window.innerWidth < this.desktopMin;
    if (this.isMobile && !mobile && this.sheetOpen) {
      this.closeSheet();
    }
    this.isMobile = mobile;
    if (mobile) {
      this.clearPosition();
    }
  }

  private lockBodyScroll(): void {
    this.document.body.classList.add('booking-sheet-open');
  }

  private unlockBodyScroll(): void {
    this.document.body.classList.remove('booking-sheet-open');
  }

  /** Desktop only: keep the card in view while scrolling tour content. */
  private updatePosition(): void {
    const host = this.el.nativeElement;
    const aside = host.closest('.tour-split__aside') as HTMLElement | null;
    const split = host.closest('.tour-split') as HTMLElement | null;

    if (!aside || !split || this.isMobile) {
      this.clearPosition();
      return;
    }

    aside.style.position = 'relative';

    const splitRect = split.getBoundingClientRect();
    const asideRect = aside.getBoundingClientRect();
    const cardH = host.offsetHeight;
    const width = Math.round(asideRect.width);

    if (splitRect.top >= this.topOffset) {
      host.style.position = 'relative';
      host.style.top = '0';
      host.style.bottom = 'auto';
      host.style.left = 'auto';
      host.style.width = '100%';
      return;
    }

    if (splitRect.bottom <= this.topOffset + cardH) {
      host.style.position = 'absolute';
      host.style.top = 'auto';
      host.style.bottom = '0';
      host.style.left = '0';
      host.style.width = '100%';
      return;
    }

    host.style.position = 'fixed';
    host.style.top = `${this.topOffset}px`;
    host.style.bottom = 'auto';
    host.style.left = `${Math.round(asideRect.left)}px`;
    host.style.width = `${width}px`;
  }

  private clearPosition(): void {
    const host = this.el.nativeElement;
    const aside = host.closest('.tour-split__aside') as HTMLElement | null;
    host.style.position = '';
    host.style.top = '';
    host.style.bottom = '';
    host.style.left = '';
    host.style.width = '';
    if (aside) aside.style.position = '';
  }
}
