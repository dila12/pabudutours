import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

declare const jQuery: any;

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.css',
})
export class Testimonial implements OnInit, OnDestroy {
  private readonly isBrowser: boolean;
  private styleEl: HTMLLinkElement | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    void this.loadOwlCarousel();
  }

  ngOnDestroy(): void {
    if (this.styleEl?.parentNode) {
      this.styleEl.parentNode.removeChild(this.styleEl);
    }
  }

  private async loadOwlCarousel(): Promise<void> {
    this.styleEl = document.createElement('link');
    this.styleEl.rel = 'stylesheet';
    this.styleEl.href = 'assets/lib/owlcarousel/assets/owl.carousel.min.css';
    document.head.appendChild(this.styleEl);

    await this.loadScript(
      'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js',
    );
    await this.loadScript('assets/lib/owlcarousel/owl.carousel.min.js');

    const $ = typeof jQuery !== 'undefined' ? jQuery : (window as any).$;
    if ($?.fn?.owlCarousel && $('.testimonial-carousel').length) {
      $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          768: { items: 2 },
          992: { items: 3 },
        },
      });
    }
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });
  }
}
