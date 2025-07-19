import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../componentes/rodape/rodape.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contato',
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit {
  contactForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''], 
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      consent: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulário Válido!');
      console.log(this.contactForm.value);
      alert('Mensagem enviada com sucesso!');
      this.contactForm.reset();
      this.contactForm.get('consent')?.setValue(false);
    } 
    else {
      console.log('Formulário Inválido');
      this.contactForm.markAllAsTouched();
    }
  }

  onPrivacidade(): void {
    this.router.navigate(['/privacidade'])
  }
}