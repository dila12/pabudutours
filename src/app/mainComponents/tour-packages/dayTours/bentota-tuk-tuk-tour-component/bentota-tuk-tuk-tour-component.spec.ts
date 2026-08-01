import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BentotaTukTukTourComponent } from './bentota-tuk-tuk-tour-component';

describe('BentotaTukTukTourComponent', () => {
  let component: BentotaTukTukTourComponent;
  let fixture: ComponentFixture<BentotaTukTukTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BentotaTukTukTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BentotaTukTukTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
