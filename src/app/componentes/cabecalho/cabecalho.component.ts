import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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

}
