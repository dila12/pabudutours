import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from '../../sharedComponents/contact-us-component/contact-us-component';

@Component({
  selector: 'app-about-component',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactUsComponent],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css'
})
export class AboutComponent {
  homecontact = true;
}
