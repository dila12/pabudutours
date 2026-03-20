import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDayTourComponent } from './two-day-tour-component';

describe('TwoDayTourComponent', () => {
  let component: TwoDayTourComponent;
  let fixture: ComponentFixture<TwoDayTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoDayTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoDayTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
