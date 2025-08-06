import { Galeria } from "./models/galeria.interface";
import { Pedido } from "./models/pedido.interface";
import { Servico } from "./models/servico.interface";
import { User } from "./models/user.interface";

export const images: Galeria[] = [
    { src: '/img/200.jpg', alt: 'Lettering - Graffiti', title: '200' },
    { src: '/img/acorn.jpg', alt: 'Natureza-morta', title: 'Bolota' },
    { src: '/img/bathroon.jpg', alt: 'Perspectiva', title: 'Pia' },
    { src: '/img/beach.jpg', alt: 'Lápis de cor', title: 'Pôr-do-Sol' },
    { src: '/img/cat.jpg', alt: 'Desenho manual', title: 'Gato' },
    { src: '/img/city.jpg', alt: 'Desenho manual', title: 'Honda City Turbo II' },
    { src: '/img/tv.jpg', alt: 'Lettering - Graffiti', title: 'TV' },
    { src: '/img/jimny.jpg', alt: 'Desenho manual', title: 'Suzuki Jimny' },
    { src: '/img/joGANdo.jpg', alt: 'Lettering - Graffiti', title: 'Canal JoGANdo' },
    { src: '/img/kitchen.jpg', alt: 'Perspectiva', title: 'Cozinha' },
    { src: '/img/sunset.jpg', alt: 'Lápis de cor', title: 'Pôr-do-Sol' },
    { src: '/img/wolf.jpg', alt: 'Caneta Esferográfica', title: 'Lobo' },
    { src: '/img/wreckage.jpg', alt: 'Mão Livre', title: 'Destroços' },
    { src: '/img/zamtrios.jpg', alt: 'Lápis de cor', title: 'Zamtrios' },
    { src: '/img/japan.jpg', alt: 'Lettering - Graffiti', title: 'Japan' },
    { src: '/img/lightpole.jpg', alt: 'Desenho manual', title: 'Urbano' },
    { src: '/img/lune.jpg', alt: 'Lettering - Graffiti', title: 'Lune' },
    { src: '/img/paint.jpg', alt: 'Lettering - Graffiti', title: 'Paint' },
    { src: '/img/warehouse.jpg', alt: 'Desenho manual', title: 'Depósito' },
];

export const userInfo: User = {
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'user'
};

export const servicos: Servico[] = [
    {
        id: 1,
        imagem: '/img/200.jpg',
        titulo: 'Texto Estilo Graffiti',
        descricao: 'Nome ou frase com arte de rua vibrante',
        preco: 60.00
    },
    {
        id: 2,
        imagem: '/img/kitchen.jpg',
        titulo: 'Desenho Realista à Lápis',
        descricao: 'Retratos e objetos detalhados em grafite',
        preco: 150.00,
        popular: true
    },
    {
        id: 3,
        imagem: '/img/beach.jpg',
        titulo: 'Paisagem em Lápis de Cor',
        descricao: 'Cenários coloridos e expressivos',
        preco: 110.00
    },
    {
        id: 4,
        imagem: '/img/zamtrios.jpg',
        titulo: 'Desenho de Animal/Objeto',
        descricao: 'Ilustrações vívidas e charmosas',
        preco: 85.00
    }
];

export const orders: Pedido[] = [
    { date: '07/04/2025', orderNumber: '#2004459', paymentMethod: 'Pix', value: 23.94, status: 'Concluído' },
    { date: '10/06/2024', orderNumber: '#2009152', paymentMethod: 'Cartão de Crédito', value: 41.79, status: 'Concluído' },
    { date: '05/07/2023', orderNumber: '#2007001', paymentMethod: 'Cartão de Crédito', value: 91.49, status: 'Concluído' },
    { date: '23/12/2022', orderNumber: '#2012142', paymentMethod: 'Boleto Bancário', value: 76.52, status: 'Concluído' },
    { date: '23/12/2022', orderNumber: '#2012144', paymentMethod: 'Cartão de Crédito', value: 102.51, status: 'Cancelado' },
    { date: '22/12/2021', orderNumber: '#2012219', paymentMethod: 'Boleto Bancário', value: 52.51, status: 'Cancelado' },
    { date: '25/06/2021', orderNumber: '#2006843', paymentMethod: 'Cartão de Crédito', value: 68.99, status: 'Concluído' }
];
