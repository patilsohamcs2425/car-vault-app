import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-car-get-delete',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './car-get-delete.html',
  styleUrl: './car-get-delete.css'
})
export class CarGetDeleteComponent implements OnInit {
  cars: any[] = [];
  searchTerm: string = '';
  selectedYear: string = '';
  selectedSort: string = '';
  years: number[] = [];

  constructor(
    private carService: CarService, 
    public authService: AuthService,
    private cdr: ChangeDetectorRef // ⬅️ The Screen Refresher
  ) {
    for(let i=2026; i>=2010; i--) { this.years.push(i); }
  }

  ngOnInit() {
    this.loadCars(); // Run immediately
  }

  loadCars() {
    this.carService.getAllCars(this.searchTerm, this.selectedYear, this.selectedSort)
      .subscribe({
        next: (data) => {
          this.cars = data;
          console.log("✅ Dashboard Data Arrived (Fresh):", data);
          this.cdr.detectChanges(); // ⬅️ FORCE SCREEN UPDATE
        },
        error: (err) => console.error("Dashboard Error:", err)
      });
  }

  deleteCar(id: string) {
    if(confirm('Delete this car?')) {
      this.carService.deleteCar(id).subscribe(() => this.loadCars());
    }
  }
}