import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarUpdate } from './car-update';

describe('CarUpdate', () => {
  let component: CarUpdate;
  let fixture: ComponentFixture<CarUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
