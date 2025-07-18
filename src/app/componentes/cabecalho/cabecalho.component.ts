import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cabecalho',
  imports: [
    NgbCollapseModule, NgbDropdownModule, MatIconModule
  ],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
    constructor(private router: Router) { }

  onLogin(): void {
    this.router.navigate(['/login'])
  }
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
  onCadastro(): void{
    this.router.navigate(['/cadastro'])
  }
}
