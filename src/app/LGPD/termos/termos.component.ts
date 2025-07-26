import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../componentes/rodape/rodape.component';

@Component({
  selector: 'app-termos',
  imports: [CabecalhoComponent, RodapeComponent, RouterLink],
  templateUrl: './termos.component.html',
  styleUrl: './termos.component.css'
})
export class TermosDeUsoComponent implements OnInit, OnDestroy {
  activeSection: string | null = null;
  private fragmentSubscription!: Subscription;
  private routerEventsSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
      this.activeSection = fragment;
      if (isPlatformBrowser(this.platformId) && fragment) {
        this.scrollToElement(fragment);
      }
    });

    this.routerEventsSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        const fragment = this.route.snapshot.fragment;
        this.activeSection = fragment;
        if (fragment) {
          this.scrollToElement(fragment);
        } else {
          this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
          this.activeSection = null;
        }
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveSectionOnScroll();
    }
  }

  ngOnDestroy(): void {
    this.fragmentSubscription.unsubscribe();
    this.routerEventsSubscription.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveSectionOnScroll();
    }
  }

  private updateActiveSectionOnScroll(): void {
    const sections = this.document.querySelectorAll('section[id]');
    let currentActiveSection: string | null = null;
    const scrollPosition = this.document.documentElement.scrollTop + 80; // Adiciona um offset para "fixar" o cabeçalho

    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveSection = section.id;
      }
    });

    this.activeSection = currentActiveSection;
  }

  private scrollToElement(fragment: string): void {
    const element = this.document.getElementById(fragment);
    if (element) {
      requestAnimationFrame(() => {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + this.document.documentElement.scrollTop;
        const offsetPosition = elementPosition - headerOffset;

        this.document.defaultView?.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    }
  }
}
