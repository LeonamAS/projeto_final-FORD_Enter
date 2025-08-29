import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';

import { User } from '../../../models/user.interface';
import { userInfo as mockUserInfo } from '../../../mockAPI';

@Component({
  selector: 'app-dados',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.css'
})
export class DadosComponent implements OnInit, OnDestroy {
  userInfo: User = {
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'user'
  };

  editMode: boolean = false;

  // Variáveis para gerenciar o estado
  private LOCAL_STORAGE_USERINFO_PREFIX = 'userInfo_';
  private currentUserEmailForId: string | null = null;
  private currentUserNameForDisplay: string | null = null;
  private destroy$ = new Subject<void>();
  
  // Emite um evento para o componente pai mostrar a mensagem
  @Output() mostrarMensagem = new EventEmitter<{ message: string, type: 'success' | 'danger' | 'warning' }>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Carrega as informações do usuário quando o componente é iniciado
    combineLatest([
        this.authService.isLoggedIn$,
        this.authService.loggedUserName$,
        this.authService.loggedUserEmail$
      ]).pipe(takeUntil(this.destroy$))
      .subscribe(([isLoggedIn, userNameDisplay, userEmail]) => {
        if (isLoggedIn && userEmail) {
          this.currentUserNameForDisplay = userNameDisplay;
          this.currentUserEmailForId = userEmail;
          this.loadUserInfo();
        } else {
          this.userInfo = { ...mockUserInfo };
          this.currentUserEmailForId = null;
          this.currentUserNameForDisplay = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleEditMode(): void {
    if (!this.currentUserEmailForId) {
      this.mostrarMensagem.emit({ message: 'Faça login para editar suas informações.', type: 'warning' });
      return;
    }

    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.saveUserInfo();
      this.mostrarMensagem.emit({ message: 'Informações salvas com sucesso!', type: 'success' });
    }
  }

  private getUserInfoLocalStorageKey(): string {
    return `${this.LOCAL_STORAGE_USERINFO_PREFIX}${this.currentUserEmailForId || 'default'}`;
  }

  private saveUserInfo(): void {
    if (!this.currentUserEmailForId) return;
    try {
      localStorage.setItem(this.getUserInfoLocalStorageKey(), JSON.stringify(this.userInfo));
    } catch (e) {
      console.error('Erro ao salvar informações do usuário no localStorage', e);
      this.mostrarMensagem.emit({
        message: 'Não foi possível salvar suas informações. Verifique as configurações do navegador.',
        type: 'danger'
      });
    }
  }

  private loadUserInfo(): void {
    if (!this.currentUserEmailForId) {
      this.userInfo = { ...mockUserInfo };
      return;
    }
    try {
      const storedUserInfo = localStorage.getItem(this.getUserInfoLocalStorageKey());
      if (storedUserInfo) {
        this.userInfo = JSON.parse(storedUserInfo);
        this.userInfo.email = this.currentUserEmailForId; // Garante que o email seja o do usuário logado
      } else {
        this.userInfo = {
          name: this.currentUserNameForDisplay || mockUserInfo.name,
          email: this.currentUserEmailForId,
          phone: mockUserInfo.phone,
          address: mockUserInfo.address,
          role: 'user'
        };
      }
    } catch (e) {
      console.error('Erro ao carregar informações do usuário do localStorage', e);
      this.mostrarMensagem.emit({
        message: 'Não foi possível carregar suas informações anteriores. As informações padrão serão usadas.',
        type: 'danger'
      });
      this.userInfo = {
        name: this.currentUserNameForDisplay || mockUserInfo.name,
        email: this.currentUserEmailForId || '',
        phone: mockUserInfo.phone,
        address: mockUserInfo.address,
        role: 'user'
      };
    }
  }
}