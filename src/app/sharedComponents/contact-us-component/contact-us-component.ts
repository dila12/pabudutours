import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environment';
import { ToastrService } from 'ngx-toastr';
import countryCode from './../../../assets/data/countryCode.json';

@Component({
  selector: 'app-contact-us-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TranslatePipe],
  templateUrl: './contact-us-component.html',
  styleUrls: ['./contact-us-component.css'],
})
export class ContactUsComponent {
  @Input() homecontact: boolean = false;
  contactForm: any;
  successMessage = '';
  countriesList = countryCode;
  selectedCountryCode: string = 'LK'; 
  phoneNumber:string = '';
  private timeoutId: any = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr:ToastrService , @Inject(PLATFORM_ID) private platformId: Object) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

 onSubmit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.contactForm.valid) {
      const country = this.countriesList.find(
        (c) => c.code === this.selectedCountryCode
      );

      const fullPhoneNumber =
        (country?.dial_code ?? '') +
        this.contactForm.get('contactPhone')?.value;

      const formData = {
        ...this.contactForm.value,
        contactPhone: fullPhoneNumber,
      };

      this.http
        .post(`${environment.backendUrl}/send-contact-email`, formData)
        .subscribe({
          next: (res: any) => {
            this.successMessage = 'Your message has been sent successfully!';
            this.toastr.success('Message sent successfully!');

            this.contactForm.reset();

            if (this.timeoutId) {
              clearTimeout(this.timeoutId);
            }

            this.timeoutId = setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          },
          error: (err) => {
            console.error('Email error:', err);
            this.successMessage =
              'There was an error sending your message. Please try again later.';
            this.toastr.error('Failed to send message');

            if (this.timeoutId) {
              clearTimeout(this.timeoutId);
            }

            this.timeoutId = setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          },
        });
    }
  
    if (this.contactForm.valid) {
      console.log('Selected Country Code:', this.selectedCountryCode);
      const country = this.countriesList.find(c => c.code === this.selectedCountryCode);
      const fullPhoneNumber = (country?.dial_code ?? '') + this.contactForm.get('contactPhone')?.value;

      const formData = {
        ...this.contactForm.value,
        contactPhone: fullPhoneNumber,
      };

      console.log('Form Data:', formData);

    this.http
      .post(`${environment.backendUrl}/send-contact-email`, formData)
      .subscribe({
        next: (res: any) => {
          console.log('Email sent successfully:', res);
          this.successMessage = 'Your message has been sent successfully!';
          this.contactForm.reset();

          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => {
          console.error('Email error:', err);
          this.successMessage = 'There was an error sending your message. Please try again later.';

          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
      });
    }
  }
}
