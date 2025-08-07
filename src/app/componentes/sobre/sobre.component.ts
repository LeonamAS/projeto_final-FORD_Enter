import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';

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
