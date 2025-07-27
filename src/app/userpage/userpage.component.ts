import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../componentes/rodape/rodape.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

interface IServico {
  id: number;
  imagem: string;
  titulo: string;
  descricao: string;
  preco: number;
  popular?: boolean;
}

interface IPedido {
  date: string;
  orderNumber: string;
  paymentMethod: string;
  value: string;
  status: 'Concluído' | 'Cancelado' | 'Em andamento';
}

interface IUserInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-userpage',
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
export class UserpageComponent implements OnInit {
  activeTab: 'fazerPedido' | 'meusPedidos' | 'minhasInformacoes' = 'fazerPedido';

  servicos: IServico[] = [
    {
      id: 1,
      imagem: 'https://placehold.co/400x300/6610f2/white?text=Arte+Digital',
      titulo: 'Paisagem de Fantasia',
      descricao: 'Pintura digital de alta resolução',
      preco: 120.99
    },
    {
      id: 2,
      imagem: 'https://placehold.co/400x300/dc3545/white?text=Personagem',
      titulo: 'Kit de Personagens de Anime',
      descricao: '5 designs de personagens únicos',
      preco: 90.99
    },
    {
      id: 3,
      imagem: 'https://placehold.co/400x300/6f42c1/white?text=Texturas',
      titulo: 'Texturas de Aquarela',
      descricao: '30 texturas contínuas',
      preco: 70.99
    },
    {
      id: 4,
      imagem: 'https://placehold.co/400x300/ffc107/white?text=Pincéis',
      titulo: 'Pacote de Pincéis Procreate',
      descricao: '50 pincéis premium',
      preco: 150.99,
      popular: true
    }
  ];

  orders: IPedido[] = [];
  private LOCAL_STORAGE_ORDERS_PREFIX = 'userOrders_';

  userInfo: IUserInfo = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
  editMode: boolean = false;
  private LOCAL_STORAGE_USERINFO_PREFIX = 'userInfo_';

  private currentUsernameForId: string | null = null;
  private currentUserNameForDisplay: string | null = null;

  constructor(private authService: AuthService) { }

ngOnInit(): void {
    this.authService.loggedUserName$.subscribe(userNameDisplay => {
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          const storedUsername = localStorage.getItem('loggedUserName');
          this.currentUserNameForDisplay = userNameDisplay; 
          this.currentUsernameForId = storedUsername; 

          if (this.currentUsernameForId) {
            this.loadUserInfo(); 
            this.loadOrders(); 
          }
        } else {
          this.currentUserNameForDisplay = null;
          this.currentUsernameForId = null;
          this.userInfo = { name: '', email: '', phone: '', address: '' };
          this.orders = [];
        }
      });
    });
  }

  changeTab(tab: 'fazerPedido' | 'meusPedidos' | 'minhasInformacoes') {
    this.activeTab = tab;
  }

  fazerPedido(servico: IServico): void {
    if (!this.currentUsernameForId) {
      alert('Você precisa estar logado para fazer um pedido.');
      this.activeTab = 'fazerPedido';
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR');
    const orderNumber = '#' + Date.now().toString().slice(-7) + Math.floor(Math.random() * 1000);

    const novoPedido: IPedido = {
      date: formattedDate,
      orderNumber: orderNumber,
      paymentMethod: 'Aguardando Pagamento',
      value: this.formatCurrency(servico.preco),
      status: 'Em andamento'
    };

    this.orders.unshift(novoPedido);
    this.saveOrders();
    this.activeTab = 'meusPedidos';

    alert(`Serviço "${servico.titulo}" adicionado ao carrinho!`);
  }

  toggleEditMode(): void {
    if (!this.currentUsernameForId) {
      alert('Faça login para editar suas informações.');
      return;
    }

    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.saveUserInfo();
      alert('Informações salvas com sucesso!');
    }
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  private getOrdersLocalStorageKey(): string {
    return `${this.LOCAL_STORAGE_ORDERS_PREFIX}${this.currentUsernameForId || 'guest'}`;
  }

  private saveOrders(): void {
    if (!this.currentUsernameForId) return;

    try {
      localStorage.setItem(this.getOrdersLocalStorageKey(), JSON.stringify(this.orders));
    } catch (e) {
      console.error('Erro ao salvar pedidos no localStorage', e);
      alert('Não foi possível salvar os pedidos. Verifique as configurações do navegador.');
    }
  }

  private loadOrders(): void {
    if (!this.currentUsernameForId) {
      this.orders = [];
      return;
    }

    try {
      const storedOrders = localStorage.getItem(this.getOrdersLocalStorageKey());
      if (storedOrders) {
        this.orders = JSON.parse(storedOrders);
      } else {
        this.orders = [
          { date: '07/04/2025', orderNumber: '#2004459', paymentMethod: 'Pix', value: 'R$ 23,94', status: 'Concluído' },
          { date: '10/06/2024', orderNumber: '#2009152', paymentMethod: 'Cartão de Crédito', value: 'R$ 41,79', status: 'Concluído' },
          { date: '05/07/2023', orderNumber: '#2007001', paymentMethod: 'Cartão de Crédito', value: 'R$ 91,49', status: 'Concluído' },
          { date: '23/12/2022', orderNumber: '#2012142', paymentMethod: 'Boleto Bancário', value: 'R$ 76,52', status: 'Concluído' },
          { date: '23/12/2022', orderNumber: '#2012144', paymentMethod: 'Cartão de Crédito', value: 'R$ 102,51', status: 'Cancelado' },
          { date: '22/12/2021', orderNumber: '#2012219', paymentMethod: 'Boleto Bancário', value: 'R$ 52,51', status: 'Cancelado' },
          { date: '25/06/2021', orderNumber: '#2006843', paymentMethod: 'Cartão de Crédito', value: 'R$ 68,99', status: 'Concluído' }
        ];
      }
    } catch (e) {
      console.error('Erro ao carregar pedidos do localStorage', e);
      alert('Não foi possível carregar os pedidos anteriores. O aplicativo iniciará com uma lista vazia.');
      this.orders = [];
    }
  }

  private getUserInfoLocalStorageKey(): string {
    return `${this.LOCAL_STORAGE_USERINFO_PREFIX}${this.currentUsernameForId || 'default'}`;
  }

  private saveUserInfo(): void {
    if (!this.currentUsernameForId) return; 

    try {
      localStorage.setItem(this.getUserInfoLocalStorageKey(), JSON.stringify(this.userInfo));
    } catch (e) {
      console.error('Erro ao salvar informações do usuário no localStorage', e);
      alert('Não foi possível salvar suas informações. Verifique as configurações do navegador.');
    }
  }

  private loadUserInfo(): void {
    if (!this.currentUsernameForId) {
      this.userInfo = { name: '', email: '', phone: '', address: '' };
      return;
    }

    try {
      const storedUserInfo = localStorage.getItem(this.getUserInfoLocalStorageKey());
      if (storedUserInfo) {
        this.userInfo = JSON.parse(storedUserInfo);
        this.userInfo.email = this.currentUsernameForId;
      } else {
        this.userInfo = {
          name: this.currentUserNameForDisplay || '', 
          email: this.currentUsernameForId,
          phone: '',
          address: ''
        };
      }
    } catch (e) {
      console.error('Erro ao carregar informações do usuário do localStorage', e);
      alert('Não foi possível carregar suas informações anteriores. As informações padrão serão usadas.');
      this.userInfo = {
        name: this.currentUserNameForDisplay || '',
        email: this.currentUsernameForId || '',
        phone: '',
        address: ''
      };
    }
  }
}
