import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import {Employee} from "../api/models/employee";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenKey = 'auth_token';
  private _signupResponse: any;

  constructor(private http: HttpClient) {}

  signup(userData: Employee): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((r) => {this._signupResponse = r})
    )
  }

  login(userData: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => this.storeToken(response.token))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  get signupResponse(): any {
    return this._signupResponse;
  }

  set signupResponse(value: any) {
    this._signupResponse = value;
  }
}
