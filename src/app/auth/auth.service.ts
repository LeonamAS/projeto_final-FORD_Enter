import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { username: 'admin@email.com', password: '123456' }
  ];

  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    const userFound = this.users.find(user => user.username === username && user.password === password);

    if (userFound) {
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {
    const userExists = this.users.some(user => user.username === username);

    if (userExists) {
      console.warn('Registration failed: Username already exists.');
      return false;
    }

    this.users.push({ username, password });
    console.log('User registered:', username);
    return true;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['/home']);
  }

  checkUsernameExists(username: string): boolean {
    return this.users.some(user => user.username === username);
  }
}