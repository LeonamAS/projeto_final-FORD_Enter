import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  name: string;
  username: string;
  password: string;
  role: 'admin' | 'user'; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[];

  private loggedIn = new BehaviorSubject<boolean>(this.getLoggedInFromLocalStorage());
  private loggedUserName = new BehaviorSubject<string | null>(this.getUserNameFromLocalStorage());
  private loggedUserUsername = new BehaviorSubject<string | null>(this.getLoggedUserUsernameFromLocalStorage());
  private loggedUserRole = new BehaviorSubject<string | null>(this.getLoggedUserRoleFromLocalStorage());

  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  loggedUserName$: Observable<string | null> = this.loggedUserName.asObservable();
  loggedUserUsername$: Observable<string | null> = this.loggedUserUsername.asObservable();
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
    this.loggedUserUsername.subscribe(value => {
      if (value) {
        localStorage.setItem('loggedUserUsername', value);
      } else {
        localStorage.removeItem('loggedUserUsername');
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

  private getLoggedUserUsernameFromLocalStorage(): string | null {
    return localStorage.getItem('loggedUserUsername');
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

    const adminUserExists = storedUsers.some(user => user.username === 'admin@email.com');
    if (!adminUserExists) {
      storedUsers.unshift({ name: 'Administrador', username: 'admin@email.com', password: '123456', role: 'admin' });
      this.saveUsersToLocalStorage(storedUsers);
    } else {
        storedUsers = storedUsers.map(user => {
            if (user.username === 'admin@email.com' && (!user.role || user.role !== 'admin')) {
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

  login(username: string, password: string): boolean {
    const userFound = this.users.find(user => user.username === username && user.password === password);

    if (userFound) {
      this.loggedIn.next(true);
      this.loggedUserName.next(userFound.name);
      this.loggedUserUsername.next(userFound.username);
      this.loggedUserRole.next(userFound.role);
      console.log(`Usuário "${userFound.name}" (${userFound.role}) logado com sucesso.`);
      return true;
    }
    return false;
  }

  register(name: string, username: string, password: string): boolean {
    const userExists = this.users.some(user => user.username === username);

    if (userExists) {
      console.warn('Registro falhou: Usuário já existe.');
      return false;
    }

    const newUser: User = { name, username, password, role: 'user' }; 
    this.users.push(newUser);
    this.saveUsersToLocalStorage(); 
    console.log('Usuário registrado:', name, username);
    return true;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.loggedUserName.next(null);
    this.loggedUserUsername.next(null);
    this.loggedUserRole.next(null); 

    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedUserName');
    localStorage.removeItem('loggedUserUsername');
    localStorage.removeItem('loggedUserRole');

    this.router.navigate(['/home']);
  }

  checkUsernameExists(username: string): boolean {
    return this.users.some(user => user.username === username);
  }
}