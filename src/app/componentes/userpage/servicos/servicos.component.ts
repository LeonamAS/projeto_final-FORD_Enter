import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { Router } from '@angular/router'; 
import { AuthService } from '../../../auth/auth.service'; 
import { FormsModule } from '@angular/forms';

import { Servico } from '../../../models/servico.interface';
import { Pedido } from '../../../models/pedido.interface';
import { servicos as mockServicos } from '../../../mockAPI';

import { PedidoService } from '../../../services/pedido.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-servicos', 
  standalone: true, 
  imports: [
    CommonModule,
    CurrencyPipe,
    FormsModule 
  ],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent {
  servicos: Servico[] = mockServicos;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private pedidoService: PedidoService, 
    private messageService: MessageService
  ) { }

  fazerPedido(servico: Servico): void {
    const userEmail = this.authService.loggedUserEmail$; 
    
    // Assine o Observable para obter o valor
    userEmail.subscribe(email => {
      if (!email) {
        this.messageService.emitirMensagem('Você precisa estar logado para fazer um pedido.', 'warning');
        return;
      }
      
      const dataAtual = new Date();
      const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
      const numeroPedido = '#' + Date.now().toString().slice(-7) + Math.floor(Math.random() * 1000);
      
      const novoPedido: Pedido = {
        date: dataFormatada,
        orderNumber: numeroPedido,
        paymentMethod: 'Aguardando Pagamento',
        value: servico.preco,
        status: 'Em andamento'
      };
      // Usa o serviço para emitir o novo pedido
      this.pedidoService.emitirPedido(novoPedido);
      // Usa o serviço para emitir a mensagem de sucesso
      this.messageService.emitirMensagem(`Serviço "${servico.titulo}" adicionado aos seus pedidos!`, 'success');
      // Navega para a aba de "Meus Pedidos"
      this.router.navigate(['userpage/pedidos']);
    });
  }
  
  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}