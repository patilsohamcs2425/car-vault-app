import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarView } from './car-view';

describe('CarView', () => {
  let component: CarView;
  let fixture: ComponentFixture<CarView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
