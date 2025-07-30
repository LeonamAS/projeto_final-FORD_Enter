import { Pedido } from "./componentes/userpage/pedido";
import { Servico } from "./componentes/userpage/servico";
import { UserInfo } from "./componentes/userpage/userinfo";

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

export const userInfo: UserInfo = {
    name: '',
    email: '',
    phone: '',
    address: ''
};

export const orders: Pedido[] = [
    { date: '07/04/2025', orderNumber: '#2004459', paymentMethod: 'Pix', value: 'R$ 23,94', status: 'Concluído' },
    { date: '10/06/2024', orderNumber: '#2009152', paymentMethod: 'Cartão de Crédito', value: 'R$ 41,79', status: 'Concluído' },
    { date: '05/07/2023', orderNumber: '#2007001', paymentMethod: 'Cartão de Crédito', value: 'R$ 91,49', status: 'Concluído' },
    { date: '23/12/2022', orderNumber: '#2012142', paymentMethod: 'Boleto Bancário', value: 'R$ 76,52', status: 'Concluído' },
    { date: '23/12/2022', orderNumber: '#2012144', paymentMethod: 'Cartão de Crédito', value: 'R$ 102,51', status: 'Cancelado' },
    { date: '22/12/2021', orderNumber: '#2012219', paymentMethod: 'Boleto Bancário', value: 'R$ 52,51', status: 'Cancelado' },
    { date: '25/06/2021', orderNumber: '#2006843', paymentMethod: 'Cartão de Crédito', value: 'R$ 68,99', status: 'Concluído' }
];
