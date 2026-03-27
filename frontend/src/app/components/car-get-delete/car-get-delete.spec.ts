import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarGetDelete } from './car-get-delete';

describe('CarGetDelete', () => {
  let component: CarGetDelete;
  let fixture: ComponentFixture<CarGetDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarGetDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarGetDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
