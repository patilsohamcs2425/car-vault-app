import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class CarService {
  private apiUrl = 'https://car-vault-app.onrender.com/api/cars';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // This helper creates the "ID Card" for every request
  private getHeaders() {
    const token = this.authService.getToken() || localStorage.getItem('token');
    
    // DEBUG: If you see 'null' in your console, you aren't logged in properly!
    console.log("Using Token for Request:", token ? "Token Found" : "TOKEN IS MISSING");

    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache', 
        'Pragma': 'no-cache'        
      })
    };
  }

  getAllCars(search: string = '', year: string = '', sort: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('search', search)
      .set('year', year)
      .set('sort', sort)
      .set('t', new Date().getTime().toString()); 

    return this.http.get(`${this.apiUrl}/getAllCars`, { ...this.getHeaders(), params });
  }

  getCarById(id: string): Observable<any> {
    const urlWithTimestamp = `${this.apiUrl}/getCarById/${id}?t=${new Date().getTime()}`;
    return this.http.get(urlWithTimestamp, this.getHeaders());
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