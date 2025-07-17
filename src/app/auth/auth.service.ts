import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly VALID_USERNAME = 'admin@email.com';
  private readonly VALID_PASSWORD = '123456';

  constructor(private http: HttpClient, router: Router) { }

  login(username: string, password: string): boolean {
    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      return true;
    }
    return false;
  }
  logout(): void {
  }
  isLoggedIn(): boolean {
    return false
  }
}