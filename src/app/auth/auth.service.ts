import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly VALID_USERNAME = 'admin@email.com';
  private readonly VALID_PASSWORD = '123456';

  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['/home']);
  }
}