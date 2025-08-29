import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../componentes/rodape/rodape.component';

@Component({
  selector: 'app-home',
  imports: [
    CabecalhoComponent,
    RodapeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }

  goToGallery(): void {
    this.router.navigate(['/galeria']);
  }
}
