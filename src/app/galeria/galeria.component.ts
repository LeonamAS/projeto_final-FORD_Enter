import { CardsComponent } from './../componentes/cards/cards.component';
import { Component } from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../componentes/rodape/rodape.component';

@Component({
  selector: 'app-galeria',
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    CardsComponent
  ],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {

}
