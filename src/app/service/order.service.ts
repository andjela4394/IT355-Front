import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  createOrder(): Observable<any> {
    const orderData = this.authService.getCurrentUserId();
    console.log("uslo");
    console.log(orderData);
    return this.http.post<any>(`${this.apiUrl}/orders`, orderData, {headers: this.headers});
  }

  getMaxOrderId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/orders/maxOrderId`, {headers: this.headers});
  }

}
