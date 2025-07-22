import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../componentes/rodape/rodape.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userpage',
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    CommonModule
  ],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent implements OnInit {
  activeTab: 'fazerPedido' | 'meusPedidos' = 'fazerPedido';

     orders = [
    { date: '07/04/2025', orderNumber: '#2004459', paymentMethod: 'Cartão de Crédito', value: 'R$ 23,94', status: 'Concluído' },
    { date: '10/06/2024', orderNumber: '#2009152', paymentMethod: 'Cartão de Crédito', value: 'R$ 41,79', status: 'Concluído' },
    { date: '05/07/2023', orderNumber: '#2007001', paymentMethod: 'Cartão de Crédito', value: 'R$ 91,49', status: 'Concluído' },
    { date: '23/12/2022', orderNumber: '#2012142', paymentMethod: 'Pix', value: 'R$ 76,52', status: 'Concluído' },
    { date: '23/12/2022', orderNumber: '#2012144', paymentMethod: 'Pix', value: 'R$ 102,51', status: 'Cancelado' },
    { date: '22/12/2021', orderNumber: '#2012219', paymentMethod: 'Pix', value: 'R$ 52,51', status: 'Cancelado' },
    { date: '25/06/2021', orderNumber: '#2006843', paymentMethod: 'Cartão de Crédito', value: 'R$ 68,99', status: 'Concluído' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  changeTab(tab: 'fazerPedido' | 'meusPedidos') {
    this.activeTab = tab;
  }
}
