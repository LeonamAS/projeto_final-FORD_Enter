export interface Cards extends Array<Image> { }

export interface Image {
  imagem: string;
  nome: string;
  link: string;
  tipo: string;
}

export interface CardsAPI {
  cards: Cards;
}