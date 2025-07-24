import { AfterViewInit, Component } from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../componentes/rodape/rodape.component';

// Importações do Swiper
import Swiper from 'swiper';
import { Thumbs } from 'swiper/modules';

@Component({
  selector: 'app-home',
  imports: [
    CabecalhoComponent,
    RodapeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  private swiperThumbs!: Swiper;
  private swiperMain!: Swiper;

  constructor() { }

  ngAfterViewInit(): void {
    // Inicializa o carrossel de miniaturas
    this.swiperThumbs = new Swiper('.swiper-thumbs', {
      spaceBetween: 10,       // Espaço entre as miniaturas
      slidesPerView: 3,       // Quantidade de miniaturas visíveis
      freeMode: true,
      watchSlidesProgress: true,
    });

    // Inicializa o carrossel principal e o conecta com as miniaturas
    this.swiperMain = new Swiper('.swiper-main', {
      modules: [Thumbs], // Habilita o módulo Thumbs
      spaceBetween: 10,
      navigation: { // Se quiser setas de navegação
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // Conecta este carrossel ao de miniaturas
      thumbs: {
        swiper: this.swiperThumbs,
      },
    });
  }
}
