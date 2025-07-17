import { Component, OnInit} from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../componentes/rodape/rodape.component';
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
    { src: '/img/200.jpg', alt: '200', title: '200' },
    { src: '/img/acorn.jpg', alt: 'acorn', title: 'acorn' },
    { src: '/img/bathroon.jpg', alt: 'bathroon', title: 'bathroon' },
    { src: '/img/beach.jpg', alt: 'beach', title: 'beach' },
    { src: '/img/cat.jpg', alt: 'cat', title: 'cat' },
    { src: '/img/city.jpg', alt: 'city', title: 'city' },
    { src: '/img/tv.jpg', alt: 'tv', title: 'tv' },
  ];

  selectedImage: any = null;
  selectedIndex: number = -1;
  private modalInstance: any;

  ngOnInit(): void {
    // Inicializa o modal do Bootstrap após o carregamento do componente
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  /**
   * Abre o modal com a imagem selecionada.
   * @param image O objeto de imagem a ser exibido.
   * @param index O índice da imagem no array.
   */
  openImageModal(image: any, index: number): void {
    this.selectedImage = image;
    this.selectedIndex = index;
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  /**
   * Fecha o modal e redefine a imagem selecionada.
   */
  closeImageModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.selectedImage = null;
    this.selectedIndex = -1;
  }

  /**
   * Navega para a imagem anterior no modal.
   */
  previousImage(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.selectedImage = this.images[this.selectedIndex];
    } else {
      // Opcional: Voltar para a última imagem se estiver na primeira
      this.selectedIndex = this.images.length - 1;
      this.selectedImage = this.images[this.selectedIndex];
    }
  }

  /**
   * Navega para a próxima imagem no modal.
   */
  nextImage(): void {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
      this.selectedImage = this.images[this.selectedIndex];
    } else {
      // Opcional: Ir para a primeira imagem se estiver na última
      this.selectedIndex = 0;
      this.selectedImage = this.images[this.selectedIndex];
    }
  }
}
