import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { environment } from '../models/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiBaseUrl + '/api/products';

  constructor(private http: HttpClient, private authService: AuthService) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, {headers: this.headers});
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url, {headers: this.headers});
  }

  getProductDetails(productIds: number[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/details`, productIds, {headers: this.headers});
  }

}
