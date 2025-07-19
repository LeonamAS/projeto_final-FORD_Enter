import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../componentes/rodape/rodape.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastro',
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    FormsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  signupData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  isRobotChecked: boolean = false;
  showRegistrationForm: boolean = false;
  consentChecked: boolean = false;
  showPassword = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onPrivacidade(): void {
    this.router.navigate(['/privacidade'])
  }

  onCreateAccount(): void {
    if (this.signupData.email && this.isRobotChecked) {
      console.log('Tentativa de criar conta com:', this.signupData.email);
      this.showRegistrationForm = true;
    } else {
      console.warn('Formulário inválido. Preencha o email e confirme o reCAPTCHA.');
    }
  }

  onRegisterUser(): void {
    if (this.signupData.password === this.signupData.confirmPassword && this.consentChecked) {
      this.router.navigate(['/userpage']);
    } else if (this.signupData.password !== this.signupData.confirmPassword) {
      console.warn('As senhas não coincidem.');
    } else if (!this.consentChecked) {
      console.warn('É necessário aceitar a política de privacidade.');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
