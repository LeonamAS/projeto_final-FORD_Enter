import { Component } from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../componentes/rodape/rodape.component';

@Component({
  selector: 'app-cadastro',
  imports: [ 
    CabecalhoComponent,
    RodapeComponent
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

}
