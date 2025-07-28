import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  name: string;
  username: string; // Usado como email para login e ID único
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[];

  private loggedIn = new BehaviorSubject<boolean>(this.getLoggedInFromLocalStorage());
  private loggedUserName = new BehaviorSubject<string | null>(this.getUserNameFromLocalStorage());
  private loggedUserUsername = new BehaviorSubject<string | null>(this.getLoggedUserUsernameFromLocalStorage()); // Novo para o username

  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  loggedUserName$: Observable<string | null> = this.loggedUserName.asObservable();
  loggedUserUsername$: Observable<string | null> = this.loggedUserUsername.asObservable(); // Expor para o componente

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
        localStorage.setItem('loggedUserUsername', value); // Salvar o username (email)
      } else {
        localStorage.removeItem('loggedUserUsername');
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

    // Adiciona o usuário admin apenas se ele não existir
    const adminUserExists = storedUsers.some(user => user.username === 'admin@email.com');
    if (!adminUserExists) {
      return [{ name: 'Administrador', username: 'admin@email.com', password: '123456' }, ...storedUsers];
    }
    return storedUsers;
  }

  private saveUsersToLocalStorage(): void {
    localStorage.setItem('registeredUsers', JSON.stringify(this.users));
  }

  login(username: string, password: string): boolean {
    const userFound = this.users.find(user => user.username === username && user.password === password);

    if (userFound) {
      this.loggedIn.next(true);
      this.loggedUserName.next(userFound.name);
      this.loggedUserUsername.next(userFound.username); // Definir o username logado
      console.log(`Usuário "${userFound.name}" logado com sucesso.`);
      return true;
    }
    return false;
  }

  register(name: string, username: string, password: string): boolean {
    const userExists = this.users.some(user => user.username === username);

    if (userExists) {
      console.warn('Registration failed: Username already exists.');
      return false;
    }

    this.users.push({ name, username, password });
    this.saveUsersToLocalStorage();
    console.log('User registered:', name, username);
    return true;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.loggedUserName.next(null);
    this.loggedUserUsername.next(null); // Limpar o username ao deslogar
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedUserName');
    localStorage.removeItem('loggedUserUsername');
    this.router.navigate(['/home']);
  }

  checkUsernameExists(username: string): boolean {
    return this.users.some(user => user.username === username);
  }
}