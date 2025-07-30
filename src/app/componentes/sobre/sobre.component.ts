import { CabecalhoComponent } from './../cabecalho/cabecalho.component';
import { RodapeComponent } from './../rodape/rodape.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  imports: [
    CabecalhoComponent,
    RodapeComponent
  ],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {

}
