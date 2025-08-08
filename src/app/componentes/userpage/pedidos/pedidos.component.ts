import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

import { Pedido } from '../../../models/pedido.interface';
import { orders as mockOrders } from '../../../mockAPI';

import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-pedidos',
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit, OnDestroy {
  orders: Pedido[] = [];

  // Variáveis necessárias para a lógica do localStorage
  private LOCAL_STORAGE_ORDERS_PREFIX = 'userOrders_';
  private currentUserEmailForId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    // Escuta o email do usuário e carrega os pedidos
    this.authService.loggedUserEmail$.pipe(takeUntil(this.destroy$))
      .subscribe(userEmail => {
        this.currentUserEmailForId = userEmail;
        this.loadOrders();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getOrdersLocalStorageKey(): string {
    return `${this.LOCAL_STORAGE_ORDERS_PREFIX}${this.currentUserEmailForId || 'guest'}`;
  }

  private loadOrders(): void {
    if (!this.currentUserEmailForId) {
      this.orders = [];
      return;
    }
    try {
      const storedOrders = localStorage.getItem(this.getOrdersLocalStorageKey());
      if (storedOrders) {
        this.orders = JSON.parse(storedOrders);
      } else {
        this.orders = [...mockOrders];
      }
    } catch (e) {
      console.error('Erro ao carregar pedidos do localStorage', e);
      this.messageService.emitirMensagem(
        'Não foi possível carregar os pedidos anteriores. O aplicativo iniciará com uma lista vazia.',
        'danger'
      );
      this.orders = [];
    }
  }
}