import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-package-item-component',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './package-item-component.html',
  styleUrl: './package-item-component.css'
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
}
