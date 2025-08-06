import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { AuthService } from '../../auth/auth.service';
import { Observable, Subject, takeUntil, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

import { Pedido } from '../../models/pedido.interface';
import { orders as mockOrders } from '../../mockAPI';

import { PedidoService } from '../../services/pedido.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent implements OnInit, OnDestroy {
  isAdmin$!: Observable<boolean>;
  message: string = '';
  messageType: 'success' | 'danger' | 'warning' | '' = '';
  private destroy$ = new Subject<void>();
  private messageSubscription!: Subscription;
  private pedidoSubscription!: Subscription;

  // Propriedades para gerenciar os pedidos e o usuário
  orders: Pedido[] = [];
  private currentUserEmailForId: string | null = null;
  private LOCAL_STORAGE_ORDERS_PREFIX = 'userOrders_';

  constructor(
    private authService: AuthService,
    private router: Router,
    private pedidoService: PedidoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.isAdmin$ = this.authService.userRole$.pipe(
      map(role => role === 'admin')
    );

    // Usa combineLatest para reagir a mudanças no status de login
    combineLatest([
      this.authService.isLoggedIn$,
      this.authService.loggedUserEmail$
    ]).pipe(takeUntil(this.destroy$))
      .subscribe(([isLoggedIn, userEmail]) => {
        if (isLoggedIn && userEmail) {
          this.currentUserEmailForId = userEmail;
          this.loadOrders();
        } else {
          this.currentUserEmailForId = null;
          this.orders = [];
        }
      });

    // Subscreve ao serviço de mensagens
    this.messageSubscription = this.messageService.message$.subscribe(msg => {
      this.showMessage(msg.message, msg.type);
    });

    // Subscreve ao serviço de pedidos
    this.pedidoSubscription = this.pedidoService.pedidoCriado$.subscribe(pedido => {
      this.handlePedidoCriado(pedido);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.messageSubscription.unsubscribe();
    this.pedidoSubscription.unsubscribe();
    this.destroy$.complete();
  }

  // Método chamado pelo evento 'mostrarMensagem' dos componentes filhos
  showMessage(msg: string, type: 'success' | 'danger' | 'warning'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 5000);
  }

  // Método chamado pelo evento 'pedidoCriado' do ServicosComponent
   handlePedidoCriado(pedido: Pedido): void {
    this.orders.unshift(pedido);
    this.saveOrders();
  }

  private saveOrders(): void {
    if (!this.currentUserEmailForId) return;
    try {
      localStorage.setItem(this.getOrdersLocalStorageKey(), JSON.stringify(this.orders));
    } catch (e) {
      console.error('Erro ao salvar pedidos no localStorage', e);
      this.showMessage('Não foi possível salvar os pedidos.', 'danger');
    }
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
      this.showMessage('Não foi possível carregar os pedidos anteriores.', 'danger');
      this.orders = [];
    }
  }

  private getOrdersLocalStorageKey(): string {
    return `${this.LOCAL_STORAGE_ORDERS_PREFIX}${this.currentUserEmailForId || 'guest'}`;
  }
}