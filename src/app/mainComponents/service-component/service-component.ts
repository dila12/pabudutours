import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-service-component',
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  templateUrl: './service-component.html',
  styleUrl: './service-component.css',
})
export class ServiceComponent {}
