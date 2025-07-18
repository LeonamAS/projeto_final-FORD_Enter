import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../componentes/rodape/rodape.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [ 
    CabecalhoComponent,
    RodapeComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit{
    signupData = {
    email: ''
  };
  isRobotChecked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCreateAccount(): void {
    // Esta função seria chamada ao submeter o formulário de cadastro.
    // Aqui você integraria a lógica para enviar o email para seu backend,
    // que então poderia enviar um email de verificação, etc.

    if (this.signupData.email && this.isRobotChecked) {
      console.log('Tentativa de criar conta com:', this.signupData.email);
      // Exemplo de onde você chamaria um serviço de cadastro:
      // this.authService.register(this.signupData.email).subscribe(
      //   response => {
      //     console.log('Cadastro iniciado com sucesso!', response);
      //     // Redirecionar para uma página de "Verifique seu email"
      //   },
      //   error => {
      //     console.error('Erro no cadastro:', error);
      //     // Exibir mensagem de erro para o usuário
      //   }
      // );
    } else {
      console.warn('Formulário inválido. Preencha o email e confirme o reCAPTCHA.');
    }
  }
}
