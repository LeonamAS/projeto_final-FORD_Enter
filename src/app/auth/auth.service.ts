import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[];

  private loggedIn = new BehaviorSubject<boolean>(this.getLoggedInFromLocalStorage());
  private loggedUserName = new BehaviorSubject<string | null>(this.getUserNameFromLocalStorage());
  private loggedUserEmail = new BehaviorSubject<string | null>(this.getLoggedUserEmailFromLocalStorage());
  private loggedUserRole = new BehaviorSubject<string | null>(this.getLoggedUserRoleFromLocalStorage());

  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  loggedUserName$: Observable<string | null> = this.loggedUserName.asObservable();
  loggedUserEmail$: Observable<string | null> = this.loggedUserEmail.asObservable();
  userRole$: Observable<string | null> = this.loggedUserRole.asObservable(); 

  constructor(private router: Router) {
    this.users = this.loadUsersFromLocalStorage();

    this.loggedIn.subscribe(value => {
      localStorage.setItem('loggedIn', JSON.stringify(value));
    });
    this.loggedUserName.subscribe(value => {
      if (value) {
        localStorage.setItem('loggedUserName', value);
      } else {
        localStorage.removeItem('loggedUserName');
      }
    });
    this.loggedUserEmail.subscribe(value => {
      if (value) {
        localStorage.setItem('loggedUserEmail', value);
      } else {
        localStorage.removeItem('loggedUserEmail');
      }
    });
    this.loggedUserRole.subscribe(value => {
      if (value) {
        localStorage.setItem('loggedUserRole', value);
      } else {
        localStorage.removeItem('loggedUserRole');
      }
    });
  }

  private getLoggedInFromLocalStorage(): boolean {
    const loggedIn = localStorage.getItem('loggedIn');
    return loggedIn ? JSON.parse(loggedIn) : false;
  }

  private getUserNameFromLocalStorage(): string | null {
    return localStorage.getItem('loggedUserName');
  }

  private getLoggedUserEmailFromLocalStorage(): string | null {
    return localStorage.getItem('loggedUserEmail');
  }

  private getLoggedUserRoleFromLocalStorage(): string | null {
    return localStorage.getItem('loggedUserRole');
  }

  private loadUsersFromLocalStorage(): User[] {
    const usersJson = localStorage.getItem('registeredUsers');
    let storedUsers: User[] = [];
    if (usersJson) {
      try {
        storedUsers = JSON.parse(usersJson);
      } catch (e) {
        console.error("Erro ao carregar usuários do localStorage:", e);
      }
    }

    const adminUserExists = storedUsers.some(user => user.email === 'admin@email.com');
    if (!adminUserExists) {
      storedUsers.unshift({ name: 'Administrador', email: 'admin@email.com', password: '123456', role: 'admin' });
      this.saveUsersToLocalStorage(storedUsers);
    } else {
        storedUsers = storedUsers.map(user => {
            if (user.email === 'admin@email.com' && (!user.role || user.role !== 'admin')) {
                return { ...user, role: 'admin' };
            }
            if (!user.role || (user.role !== 'admin' && user.role !== 'user')) {
                return { ...user, role: 'user' };
            }
            return user;
        });
        this.saveUsersToLocalStorage(storedUsers); 
    }

    return storedUsers;
  }

  private saveUsersToLocalStorage(usersToSave: User[] = this.users): void {
    localStorage.setItem('registeredUsers', JSON.stringify(usersToSave));
  }

  login(email: string, password: string): boolean {
    const userFound = this.users.find(user => user.email === email && user.password === password);

    if (userFound) {
      this.loggedIn.next(true);
      this.loggedUserName.next(userFound.name);
      this.loggedUserEmail.next(userFound.email);
      this.loggedUserRole.next(userFound.role);
      console.log(`Usuário "${userFound.name}" (${userFound.role}) logado com sucesso.`);
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    const userExists = this.users.some(user => user.email === email);

    if (userExists) {
      console.warn('Registro falhou: Usuário já existe.');
      return false;
    }

    const newUser: User = { name, email, password, role: 'user' }; 
    this.users.push(newUser);
    this.saveUsersToLocalStorage(); 
    console.log('Usuário registrado:', name, email);
    return true;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.loggedUserName.next(null);
    this.loggedUserEmail.next(null);
    this.loggedUserRole.next(null); 

    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedUserName');
    localStorage.removeItem('loggedUserEmail');
    localStorage.removeItem('loggedUserRole');

    this.router.navigate(['/home']);
  }

  checkEmailExists(email: string): boolean {
    return this.users.some(user => user.email === email);
  }
}