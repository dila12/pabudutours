import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-package-item-component',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './package-item-component.html',
  styleUrl: './package-item-component.css',
})
export class PackageItemComponent {
  @Input() image!: string;
  @Input() days!: string;
  @Input() persons!: string;
  @Input() rating!: number;
  @Input() price!: number;
  @Input() title!: string;
  @Input() routerLink!: string;
  /** When set, card title is resolved from `tours.{filecode}` i18n key. */
  @Input() filecode?: string;
  /** Heading level so card titles stay sequential under their section (h3/h4). */
  @Input() titleLevel: 3 | 4 = 4;

  /** Prefer modern formats next to the source JPEG/PNG when available. */
  get avifSrc(): string | null {
    return this.modernSrc('avif');
  }

  get webpSrc(): string | null {
    return this.modernSrc('webp');
  }

  private modernSrc(ext: 'webp' | 'avif'): string | null {
    if (!this.image) return null;
    if (new RegExp(`\\.${ext}$`, 'i').test(this.image)) {
      return this.image;
    }
    // Already a modern format of the other type — don't invent a sibling.
    if (/\.(webp|avif)$/i.test(this.image)) {
      return null;
    }
    return this.image.replace(/\.(jpe?g|png)$/i, `-card.${ext}`);
  }
}