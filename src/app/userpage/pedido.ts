export interface Pedido {
  date: string;
  orderNumber: string;
  paymentMethod: string;
  value: string;
  status: 'Concluído' | 'Cancelado' | 'Em andamento';
}