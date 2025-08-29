import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../componentes/rodape/rodape.component';

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
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isRobotChecked: boolean = false;
  showRegistrationForm: boolean = false;
  consentChecked: boolean = false;
  showPassword = false;
  errorMessage: string = '';
  showSuccessCard: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onPrivacidade(): void { this.router.navigate(['/privacidade']) }
  onTermos(): void { this.router.navigate(['/termos']) }

  onCreateAccount(): void {
    this.errorMessage = '';

    if (!this.signupData.email) {
      this.errorMessage = 'É necessário inserir um email.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.signupData.email)) {
      this.errorMessage = 'Insira um email válido.';
      return;
    }

    if (!this.isRobotChecked) {
      this.errorMessage = 'Por favor, confirme que não é um robô.';
      return;
    }

    if (this.authService.checkEmailExists(this.signupData.email)) {
      this.errorMessage = 'Este email já está cadastrado. Por favor, faça login ou use outro email.';
      return;
    }

    console.log('Tentativa de criar conta com:', this.signupData.email);
    this.showRegistrationForm = true;
  }

  onRegisterUser(): void {
    this.errorMessage = '';

    if (!this.signupData.name) {
      this.errorMessage = 'É necessário inserir seu nome.';
      return;
    }

    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    if (this.signupData.password.length < 6) {
      this.errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    if (!this.consentChecked) {
      this.errorMessage = 'Você deve concordar com a política de privacidade para se cadastrar.';
      return;
    }

    const success = this.authService.register(this.signupData.name, this.signupData.email, this.signupData.password);
    if (success) {
      console.log('Usuário registrado com sucesso:', this.signupData.email);
      this.authService.login(this.signupData.email, this.signupData.password);
      this.showRegistrationForm = false;
      this.showSuccessCard = true;
    } else {
      this.errorMessage = 'Falha ao registrar usuário. O email pode já estar em uso ou outro erro ocorreu.';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  goToDashboard(): void {
    this.router.navigate(['/userpage']);
  }
}
