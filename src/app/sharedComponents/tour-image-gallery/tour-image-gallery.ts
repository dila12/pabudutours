import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-tour-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-image-gallery.html',
  styleUrl: './tour-image-gallery.css',
})
export class TourImageGalleryComponent implements OnInit, OnChanges, OnDestroy {
  @Input() images: string[] = [];
  @Input() alt = 'Tour image';
  @Input() autoplayMs = 3000;

  currentIndex = 0;
  gridOpen = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get currentImage(): string {
    return this.images[this.currentIndex] ?? '';
  }

  get previewThumbs(): string[] {
    return this.images.slice(0, 3);
  }

  get overflowCount(): number {
    return Math.max(0, this.images.length - 3);
  }

  get showOverflowBadge(): boolean {
    return this.overflowCount > 0;
  }

  get showDots(): boolean {
    return this.images.length > 1 && this.images.length <= 8;
  }

  get showCounter(): boolean {
    return this.images.length > 8;
  }

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      this.currentIndex = 0;
      this.restartAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    this.unlockBodyScroll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.gridOpen) {
      this.closeGrid();
    }
  }

  nextImage(): void {
    if (!this.images.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(): void {
    if (!this.images.length) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToImage(index: number): void {
    if (index < 0 || index >= this.images.length) return;
    this.currentIndex = index;
  }

  onThumbClick(index: number, isLastPreview: boolean): void {
    if (isLastPreview && this.showOverflowBadge) {
      this.openGrid();
      return;
    }
    this.goToImage(index);
  }

  openGrid(): void {
    this.gridOpen = true;
    this.stopAutoplay();
    this.lockBodyScroll();
  }

  closeGrid(): void {
    this.gridOpen = false;
    this.unlockBodyScroll();
    this.startAutoplay();
  }

  selectFromGrid(index: number): void {
    this.goToImage(index);
    this.closeGrid();
  }

  private startAutoplay(): void {
    if (!this.isBrowser || this.autoplayMs <= 0 || this.images.length < 2) {
      return;
    }
    this.stopAutoplay();
    this.intervalId = setInterval(() => this.nextImage(), this.autoplayMs);
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    if (!this.gridOpen) {
      this.startAutoplay();
    }
  }

  private stopAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private lockBodyScroll(): void {
    if (this.isBrowser) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  private unlockBodyScroll(): void {
    if (this.isBrowser) {
      this.document.body.style.overflow = '';
    }
  }
}
