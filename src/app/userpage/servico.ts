export interface Servico {
  id: number;
  imagem: string;
  titulo: string;
  descricao: string;
  preco: number;
  popular?: boolean;
}