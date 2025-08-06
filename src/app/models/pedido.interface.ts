export interface Pedido {
  date: string;
  orderNumber: string;
  paymentMethod: string;
  value: number;
  status: 'Concluído' | 'Cancelado' | 'Em andamento';
}