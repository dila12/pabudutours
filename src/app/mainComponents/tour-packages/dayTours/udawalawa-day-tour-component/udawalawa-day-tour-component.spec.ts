import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdawalawaDayTourComponent } from './udawalawa-day-tour-component';

describe('UdawalawaDayTourComponent', () => {
  let component: UdawalawaDayTourComponent;
  let fixture: ComponentFixture<UdawalawaDayTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdawalawaDayTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdawalawaDayTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
