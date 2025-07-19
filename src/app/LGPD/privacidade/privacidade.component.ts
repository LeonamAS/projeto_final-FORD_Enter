import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../componentes/rodape/rodape.component';
import {  ActivatedRoute, Router, RouterLink  } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-privacidade',
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    RouterLink
  ],
  templateUrl: './privacidade.component.html',
  styleUrl: './privacidade.component.css'
})
export class PrivacidadeComponent implements OnInit, AfterViewInit {
  activeSection: string = 'introducao'; 
  private headerHeight: number = 60;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private router: Router
  ) { }

ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Atualiza a seção ativa quando o fragmento da URL muda
      this.route.fragment.subscribe(fragment => {
        if (fragment) {
          this.activeSection = fragment;
          // O `anchorScrolling: 'enabled'` do router já fará a rolagem.
          // O setTimeout é para garantir que a rolagem aconteça APÓS a renderização completa.
          setTimeout(() => {
            const element = document.getElementById(fragment);
            if (element) {
              // Rola para o elemento. O `scrollOffset` do router deve cuidar do deslocamento.
              // block: 'start' para alinhar o topo do elemento com o topo da área visível
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100); // Pequeno atraso para garantir que o DOM esteja renderizado
        } else {
          // Se não houver fragmento na URL, define a primeira seção como ativa por padrão
          this.activeSection = 'introducao';
          // E rola para o início da página ou para a primeira seção se desejar
          setTimeout(() => {
             document.getElementById('introducao')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      });

      // 2. Listener para rolagem da página para ATUALIZAR o destaque do menu lateral
      //    Este é o seu "Scrollspy" manual que agora complementa o routerLink.
      this.setupScrollListener();
    }
  }

  ngAfterViewInit(): void {

  }

  setupScrollListener(): void {
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]');
      let currentActiveSection: string = this.activeSection;

      // Pegue a altura do cabeçalho que foi configurada no scrollOffset do router (20px ou mais)
      // Se seu cabeçalho tem 60px e scrollOffset é 20px, ainda sobram 40px de "esconderijo".
      // Então, o ponto de referência para a seção ativa deve ser a altura do cabeçalho.
      const offsetFromTop = this.headerHeight; // Usar a altura do cabeçalho como referência

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Uma seção é considerada ativa se o seu topo estiver acima ou no offsetFromTop
        // e seu final estiver abaixo do offsetFromTop.
        if (rect.top <= offsetFromTop && rect.bottom > offsetFromTop) {
          currentActiveSection = section.id;
        }
      });

      if (this.activeSection !== currentActiveSection) {
        this.activeSection = currentActiveSection;
        // O `[class.active]` no HTML já cuida disso.
        // Não precisamos do `updateActiveNavLink()` aqui se o HTML estiver usando [class.active]
      }
    }, { passive: true }); // Para melhor performance de scroll
  }

  updateActiveNavLink(): void {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active', 'fw-bold', 'text-primary');
      link.classList.add('text-dark');
      // AQUI é onde o problema pode estar:
      // O `link.getAttribute('href')?.substring(1)` não vai funcionar com `[routerLink]`
      // Você precisa que o `routerLink` defina o `href` ou que você use o `activeSection` diretamente.
      // Com [class.active]="activeSection === 'id'", esta função se torna desnecessária.
      // Se você a mantém, precisaria de uma lógica para saber o fragmento do link.
    });
    // Adicione esta parte para aplicar o estilo `active`
    const activeLinkElement = document.querySelector(`.nav-link[routerlink="."][fragment="${this.activeSection}"]`);
    if (activeLinkElement) {
        activeLinkElement.classList.add('active', 'fw-bold', 'text-primary');
        activeLinkElement.classList.remove('text-dark');
    }
  }
}
