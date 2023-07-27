import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
//import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; 
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { username, password };

    return this.http.post<any>(url, body).pipe(
      tap(response => {
        const token = response.token; 
        this.saveToken(token);
      })
    );
  }

  signup(firstName: string, lastName: string, username: string, password: string, role: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = { firstName, lastName, username, password, role };

    return this.http.post(url, body);
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? '';
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken = jwt_decode<any>(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentDate = new Date();
    return currentDate > expirationDate;
  }

  

  getCurrentUserId(): number | null {
    const token = this.getToken(); 
    console.log(token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken);
      return decodedToken.userId;
    }
    return null;
  }

  getCurrentUsername(): string {
    const token = this.getToken(); 
    console.log(token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken);
      return decodedToken.username;
    }
    return "";
  }

  isAdmin(): boolean{
    const token = this.getToken(); 
    console.log(token);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken);
      if(decodedToken.role == 'ADMIN'){
        return true
      }
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];