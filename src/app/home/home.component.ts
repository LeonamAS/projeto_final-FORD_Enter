import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { Router } from '@angular/router';

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
