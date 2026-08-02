import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactUsComponent } from '../../sharedComponents/contact-us-component/contact-us-component';

@Component({
  selector: 'app-about-component',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactUsComponent, TranslatePipe],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css'
})
export class AboutComponent {
  homecontact = true;
}
