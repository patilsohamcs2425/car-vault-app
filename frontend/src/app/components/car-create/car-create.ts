import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../../services/car';

@Component({
  selector: 'app-car-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './car-create.html',
  styleUrl: './car-create.css'
})
export class CarCreateComponent {
  carForm: FormGroup;
  isSubmitting = false;
  
  carData: any = {
    'Maruti Suzuki': ['Swift', 'Baleno', 'Brezza', 'Dzire', 'Ertiga'],
    'Hyundai': ['i20', 'Creta', 'Verna', 'Venue', 'Tucson'],
    'Tata': ['Nexon', 'Harrier', 'Safari', 'Altroz', 'Tiago'],
    'Mahindra': ['XUV700', 'Thar', 'Scorpio-N', 'Bolero', 'XUV300'],
    'Toyota': ['Fortuner', 'Innova Crysta', 'Glanza', 'Urban Cruiser', 'Hyryder'],
    'Honda': ['City', 'Amaze', 'Elevate', 'Jazz', 'WR-V']
  };

  companies: string[] = Object.keys(this.carData);
  models: string[] = [];
  years: number[] = [];

  constructor(
    private fb: FormBuilder, 
    private carService: CarService, 
    private router: Router
  ) {
    for (let i = 2026; i >= 2010; i--) {
      this.years.push(i);
    }

    // RELAXED VALIDATION
    this.carForm = this.fb.group({
      company: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]], // Just needs to be a positive number
      color: ['', Validators.required],
      carNumber: ['', Validators.required], // Removed strict Indian plate format
      image: ['', Validators.required] // Removed strict http:// requirement
    });

    this.carForm.get('company')?.valueChanges.subscribe(selectedCompany => {
      this.models = this.carData[selectedCompany] || [];
      this.carForm.get('model')?.setValue(''); 
    });
  }

  save() {
    if (this.carForm.valid) {
      this.isSubmitting = true;

      this.carService.createCar(this.carForm.value).subscribe({
        next: (response) => {
          setTimeout(() => {
            this.router.navigate(['/cars']);
          }, 800);
        },
        error: (err) => {
          this.isSubmitting = false;
          alert(err.error?.message || 'Failed to add car. Check if backend is running.');
        }
      });
    } else {
      // This will now trigger if you miss a field
      alert('Missing Information: Please make sure every single box is filled out.');
    }
  }
}