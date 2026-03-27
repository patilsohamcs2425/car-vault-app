import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../services/car';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-view.html',
  styleUrl: './car-view.css'
})
export class CarViewComponent implements OnInit {
  car: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute, 
    private carService: CarService,
    private cdr: ChangeDetectorRef // ⬅️ Force Screen Update
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.carService.getCarById(id).subscribe({
      next: (data) => {
        console.log("✅ View Data Arrived:", data);
        
        // Handle data if it's wrapped or raw
        if (data && data.car) {
             this.car = data.car; 
        } else {
             this.car = data;
        }

        this.cdr.detectChanges(); // ⬅️ FORCE UPDATE
      },
      error: (err) => {
        console.error("View Error:", err);
        this.errorMessage = "Failed to load car.";
        this.cdr.detectChanges();
      }
    });
  }
}