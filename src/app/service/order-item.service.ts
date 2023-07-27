import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AuthService } from './auth.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private apiUrl = 'http://localhost:8080/api'; 
  maxOrderId!: number;

  constructor(private http: HttpClient, private authService: AuthService, private orderService: OrderService) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  getMaxOrderId(): void {
    this.orderService.getMaxOrderId().subscribe(
      (maxOrderId: number) => {
        this.maxOrderId = maxOrderId;
        console.log(maxOrderId);
      },
      (error: any) => {
        console.error('Error fetching max order ID:', error);
      }
    );
  }


  createOrderItems(cartItems: any[], maxOrderId: number): Observable<any> {
    this.getMaxOrderId();
    const orderItemObservables = cartItems.map((cartItem) => {
      console.log("Create order items");
      const orderItem = {
        orderId: (maxOrderId+1),
        productId: cartItem.productId,
      };
      console.log(orderItem);
      return this.http.post<any>(`${this.apiUrl}/order-items`, orderItem, { headers: this.headers });
    });
  
    return forkJoin(orderItemObservables);
  }
}
