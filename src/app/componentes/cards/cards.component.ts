import { Component } from '@angular/core';
import { Image } from '../../models/card.model';

@Component({
  selector: 'app-cards',
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  cards: Image = {
    imagem: '/img/sunset.jpg',
    nome: 'Sunset',
    link: 'https://bsky.app/profile/kurogane.bsky.social/post/3lhhh52tfvs27',
    tipo: 'desenho'
  }
}
