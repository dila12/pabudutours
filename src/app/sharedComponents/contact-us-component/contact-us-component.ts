import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnDestroy, PLATFORM_ID } from '@angular/core';
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
export class ContactUsComponent implements OnDestroy {
  @Input() homecontact = false;
  contactForm: any;
  successMessage = '';
  isSubmitting = false;
  countriesList = countryCode;
  selectedCountryCode = 'LK';
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private readonly isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.isBrowser || this.isSubmitting || this.contactForm.invalid) {
      return;
    }

    const country = this.countriesList.find(
      (c) => c.code === this.selectedCountryCode,
    );
    const fullPhoneNumber =
      (country?.dial_code ?? '') + this.contactForm.get('contactPhone')?.value;

    const formData = {
      ...this.contactForm.value,
      contactPhone: fullPhoneNumber,
    };

    this.isSubmitting = true;
    this.http
      .post(`${environment.backendUrl}/send-contact-email`, formData)
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.successMessage = 'Your message has been sent successfully!';
          this.toastr.success('Message sent successfully!');
          this.contactForm.reset();
          this.clearSuccessLater();
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Email error:', err);
          this.successMessage =
            'There was an error sending your message. Please try again later.';
          this.toastr.error('Failed to send message');
          this.clearSuccessLater();
        },
      });
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private clearSuccessLater() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}
