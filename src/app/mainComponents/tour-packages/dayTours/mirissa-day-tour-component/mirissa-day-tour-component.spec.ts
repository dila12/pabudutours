import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirissaDayTourComponent } from './mirissa-day-tour-component';

describe('MirissaDayTourComponent', () => {
  let component: MirissaDayTourComponent;
  let fixture: ComponentFixture<MirissaDayTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MirissaDayTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MirissaDayTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
