import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });


  addToCart(productId: any): Observable<any> {
    const userId = this.authService.getCurrentUserId(); 
    console.log(userId);
    const cartItem = {
      userId: userId,
      productId: productId,
      quantity: 1
    };

    return this.http.post<any>(`${this.apiUrl}/cart`, cartItem, { headers: this.headers });
  }

  getCartItems(): Observable<any[]> {
    const userId = this.authService.getCurrentUserId();
    console.log(userId);
    return this.http.get<any[]>(`${this.apiUrl}/cart/${userId}`, {headers: this.headers});
  }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/place-order`, orderData, {headers: this.headers});
  }

  clearCart(): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    return this.http.delete<any>(`${this.apiUrl}/cart/deleteId/${userId}`, {headers: this.headers});
  }

}
