import { Component } from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../componentes/rodape/rodape.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    FormsModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.loginData.email && this.loginData.password) {
      const isAuthenticated = this.auth.login(this.loginData.email, this.loginData.password);
      if (isAuthenticated) {
        this.router.navigate(['/userpage']);
      } else {
        console.log('Credenciais inválidas.');
      }
    } else {
      console.warn('Formulário inválido. Preencha todos os campos.');
    }
  }

  onCadastro(): void{
    this.router.navigate(['/cadastro'])
  }
}
