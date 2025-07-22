import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cabecalho',
  imports: [
    NgbCollapseModule,
    NgbDropdownModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})

export class CabecalhoComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  loggedUserName$!: Observable<string | null>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.loggedUserName$ = this.authService.loggedUserName$;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  onLogin(): void { this.router.navigate(['/login']); }
  onHome(): void { this.router.navigate(['/home']); }
  onContato(): void { this.router.navigate(['/contato']); }
  onGaleria(): void { this.router.navigate(['/galeria']); }
  onSobre(): void { this.router.navigate(['/sobre']); }
  onCadastro(): void { this.router.navigate(['/cadastro']); }
  onUserpage(): void { this.router.navigate(['/userpage']); }
}
