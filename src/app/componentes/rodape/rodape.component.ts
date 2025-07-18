import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rodape',
  imports: [  ],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.css'
})
export class RodapeComponent {
  constructor(private router: Router) { }

  onHome(): void {
    this.router.navigate(['/home'])
  }
  onContato(): void{
    this.router.navigate(['/contato'])
  }
  onGaleria(): void{
    this.router.navigate(['/galeria'])
  }
  onSobre(): void{
    this.router.navigate(['/sobre'])
  }
}
