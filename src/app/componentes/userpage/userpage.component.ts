import { CabecalhoComponent } from './../cabecalho/cabecalho.component';
import { RodapeComponent } from './../rodape/rodape.component';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { combineLatest, Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Servico } from '../../models/servico.interface';
import { Pedido } from '../../models/pedido.interface';
import { User } from '../../models/user.interface';
import { servicos as mockServicos, orders as mockOrders, userInfo as mockUserInfo } from '../../mockAPI';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    CommonModule,
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent implements OnInit, OnDestroy {
  activeTab: 'fazerPedido' | 'meusPedidos' | 'minhasInformacoes' | 'adminPanel' = 'fazerPedido';

  servicos: Servico[] = mockServicos;
  orders: Pedido[] = [];

  private LOCAL_STORAGE_ORDERS_PREFIX = 'userOrders_';

  userInfo: User = {
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'user'
  };
  editMode: boolean = false;
  private LOCAL_STORAGE_USERINFO_PREFIX = 'userInfo_';

  private currentUserEmailForId: string | null = null;
  private currentUserNameForDisplay: string | null = null;

  private destroy$ = new Subject<void>();

  message: string = '';
  messageType: 'success' | 'danger' | 'warning' | '' = '';

  isAdmin$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isAdmin$ = this.authService.userRole$.pipe(
      map(role => role === 'admin')
    );

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const tabParam = params['tab'];
      if (tabParam && ['fazerPedido', 'meusPedidos', 'minhasInformacoes', 'adminPanel'].includes(tabParam)) {
        this.activeTab = tabParam as 'fazerPedido' | 'meusPedidos' | 'minhasInformacoes' | 'adminPanel';
      }
    });

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
          this.loadOrders();
        } else {
          this.currentUserNameForDisplay = null;
          this.currentUserEmailForId = null;
          this.userInfo = {
            name: '',
            email: '',
            phone: '',
            address: '',
            role: 'user' 
          };
          this.orders = [];
          this.message = '';
          this.messageType = '';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTab(tab: 'fazerPedido' | 'meusPedidos' | 'minhasInformacoes' | 'adminPanel') {
    this.activeTab = tab;
  }

  fazerPedido(servico: Servico): void {
    if (!this.currentUserEmailForId) {
      this.showMessage('Você precisa estar logado para fazer um pedido.', 'warning');
      this.activeTab = 'fazerPedido';
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR');
    const orderNumber = '#' + Date.now().toString().slice(-7) + Math.floor(Math.random() * 1000);

    const novoPedido: Pedido = {
      date: formattedDate,
      orderNumber: orderNumber,
      paymentMethod: 'Aguardando Pagamento',
      value: this.formatCurrency(servico.preco),
      status: 'Em andamento'
    };

    this.orders.unshift(novoPedido);
    this.saveOrders();
    this.activeTab = 'meusPedidos';

    this.showMessage(`Serviço "${servico.titulo}" adicionado aos seus pedidos!`, 'success');
  }

  toggleEditMode(): void {
    if (!this.currentUserEmailForId) {
      this.showMessage('Faça login para editar suas informações.', 'warning');
      return;
    }

    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.saveUserInfo();
      this.showMessage('Informações salvas com sucesso!', 'success');
    }
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  private getOrdersLocalStorageKey(): string {
    return `${this.LOCAL_STORAGE_ORDERS_PREFIX}${this.currentUserEmailForId || 'guest'}`;
  }

  private saveOrders(): void {
    if (!this.currentUserEmailForId) return;
    try {
      localStorage.setItem(this.getOrdersLocalStorageKey(), JSON.stringify(this.orders));
    } catch (e) {
      console.error('Erro ao salvar pedidos no localStorage', e);
      this.showMessage('Não foi possível salvar os pedidos. Verifique as configurações do navegador.', 'danger');
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
      this.showMessage('Não foi possível carregar os pedidos anteriores. O aplicativo iniciará com uma lista vazia.', 'danger');
      this.orders = [];
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
      this.showMessage('Não foi possível salvar suas informações. Verifique as configurações do navegador.', 'danger');
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
        this.userInfo.email = this.currentUserEmailForId;
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
      this.showMessage('Não foi possível carregar suas informações anteriores. As informações padrão serão usadas.', 'danger');
      this.userInfo = {
        name: this.currentUserNameForDisplay || mockUserInfo.name,
        email: this.currentUserEmailForId || '',
        phone: mockUserInfo.phone,
        address: mockUserInfo.address,
        role: 'user'
      };
    }
  }

  showMessage(msg: string, type: 'success' | 'danger' | 'warning'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }
}