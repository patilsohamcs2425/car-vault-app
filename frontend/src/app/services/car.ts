import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class CarService {
  private apiUrl = 'https://car-vault-app.onrender.com/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache', // ⬅️ NEW: Force fresh data
        'Pragma': 'no-cache'         // ⬅️ NEW: Force fresh data
      })
    };
  }

  // We add a timestamp 't' to the URL to make every request unique.
  // This forces the browser to ignore the 304 cache and get a 200 OK.
  
  getAllCars(search: string = '', year: string = '', sort: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('search', search)
      .set('year', year)
      .set('sort', sort)
      .set('t', new Date().getTime().toString()); // ⬅️ Unique timestamp

    return this.http.get(`${this.apiUrl}/getAllCars`, { ...this.getHeaders(), params });
  }

  getCarById(id: string): Observable<any> {
    // Add timestamp to URL
    return this.http.get(`${this.apiUrl}/getCarById/${id}?t=${new Date().getTime()}`, this.getHeaders());
  }

  createCar(car: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createCar`, car, this.getHeaders());
  }

  updateCar(id: string, car: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateCar/${id}`, car, this.getHeaders());
  }

  deleteCar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteCar/${id}`, this.getHeaders());
  }
}