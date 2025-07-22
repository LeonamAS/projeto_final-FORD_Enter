import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  name: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { name: 'Administrador', username: 'admin@email.com', password: '123456' }
  ];

  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedUserName = new BehaviorSubject<string | null>(null);

  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  loggedUserName$: Observable<string | null> = this.loggedUserName.asObservable();

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    const userFound = this.users.find(user => user.username === username && user.password === password);

    if (userFound) {
      this.loggedIn.next(true);
      this.loggedUserName.next(userFound.name);
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
    console.log('User registered:', name, username);
    return true;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.loggedUserName.next(null);
    this.router.navigate(['/home']);
  }

  checkUsernameExists(username: string): boolean {
    return this.users.some(user => user.username === username);
  }

  // Opcional: Para persistir o login entre atualizações de página, você precisaria
  // de localStorage e carregar o estado no construtor ou ngOnInit do serviço.
}