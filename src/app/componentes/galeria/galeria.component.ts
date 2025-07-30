import { Component, OnInit} from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-galeria',
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  images = [
    { src: '/img/200.jpg', alt: 'Lettering - Graffiti', title: '200' },
    { src: '/img/acorn.jpg', alt: 'Natureza-morta', title: 'Bolota' },
    { src: '/img/bathroon.jpg', alt: 'Perspectiva', title: 'Pia' },
    { src: '/img/beach.jpg', alt: 'Lápis de cor', title: 'Pôr-do-Sol' },
    { src: '/img/cat.jpg', alt: 'Desenho manual', title: 'Gato' },
    { src: '/img/city.jpg', alt: 'Desenho manual', title: 'Honda City Turbo II' },
    { src: '/img/tv.jpg', alt: 'Lettering - Graffiti', title: 'TV' },
    { src: '/img/jimny.jpg', alt: 'Desenho manual', title: 'Suzuki Jimny' },
    { src: '/img/joGANdo.jpg', alt: 'Lettering - Graffiti', title: 'Canal JoGANdo' },
    { src: '/img/kitchen.jpg', alt: 'Perspectiva', title: 'Cozinha' },
    { src: '/img/sunset.jpg', alt: 'Lápis de cor', title: 'Pôr-do-Sol' },
    { src: '/img/wolf.jpg', alt: 'Caneta Esferográfica', title: 'Lobo' },
    { src: '/img/wreckage.jpg', alt: 'Mão Livre', title: 'Destroços' },
    { src: '/img/zamtrios.jpg', alt: 'Lápis de cor', title: 'Zamtrios' },
    { src: '/img/japan.jpg', alt: 'Lettering - Graffiti', title: 'Japan' },
    { src: '/img/lightpole.jpg', alt: 'Desenho manual', title: 'Urbano' },
    { src: '/img/lune.jpg', alt: 'Lettering - Graffiti', title: 'Lune' },
    { src: '/img/paint.jpg', alt: 'Lettering - Graffiti', title: 'Paint' },
    { src: '/img/warehouse.jpg', alt: 'Desenho manual', title: 'Depósito' },
  ];

  selectedImage: any = null;
  selectedIndex: number = -1;
  private modalInstance: any;

  ngOnInit(): void {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  openImageModal(image: any, index: number): void {
    this.selectedImage = image;
    this.selectedIndex = index;
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  closeImageModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.selectedImage = null;
    this.selectedIndex = -1;
  }

  previousImage(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.selectedImage = this.images[this.selectedIndex];
    } else {
      this.selectedIndex = this.images.length - 1;
      this.selectedImage = this.images[this.selectedIndex];
    }
  }

  nextImage(): void {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
      this.selectedImage = this.images[this.selectedIndex];
    } else {
      this.selectedIndex = 0;
      this.selectedImage = this.images[this.selectedIndex];
    }
  }
}
