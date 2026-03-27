import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car';

@Component({
  selector: 'app-car-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './car-update.html',
  styleUrl: './car-update.css'
})
export class CarUpdateComponent implements OnInit {
  carForm: FormGroup;
  carId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize form empty
    this.carForm = this.fb.group({
      company: ['', Validators.required],
      model: ['', Validators.required],
      price: [null, Validators.required],
      color: ['', Validators.required],
      carNumber: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get the ID from the URL (e.g., /update/123)
    this.carId = this.route.snapshot.paramMap.get('id');
    
    if (this.carId) {
      this.carService.getCarById(this.carId).subscribe({
        next: (data) => {
          // Fill the form with existing data
          this.carForm.patchValue(data);
        },
        error: (err) => console.error('Error fetching car details', err)
      });
    }
  }

  update() {
    if (this.carForm.valid && this.carId) {
      this.carService.updateCar(this.carId, this.carForm.value).subscribe({
        next: () => {
          alert('Car updated successfully!');
          this.router.navigate(['/cars']);
        },
        error: (err) => alert('Update failed')
      });
    }
  }
}