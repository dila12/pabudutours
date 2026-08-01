import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-package-item-component',
  standalone: true,
  imports: [CommonModule,RouterModule],
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
  /** Heading level so card titles stay sequential under their section (h3/h4). */
  @Input() titleLevel: 3 | 4 = 4;
}
