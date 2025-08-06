import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Pedido } from '../models/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidoCriadoSubject = new Subject<Pedido>();
  pedidoCriado$: Observable<Pedido> = this.pedidoCriadoSubject.asObservable();

  constructor() { }

  emitirPedido(pedido: Pedido): void {
    this.pedidoCriadoSubject.next(pedido);
  }
}