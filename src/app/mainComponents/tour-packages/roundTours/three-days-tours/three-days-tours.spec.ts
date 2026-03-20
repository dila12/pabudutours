import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDaysTours } from './three-days-tours';

describe('ThreeDaysTours', () => {
  let component: ThreeDaysTours;
  let fixture: ComponentFixture<ThreeDaysTours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeDaysTours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDaysTours);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
