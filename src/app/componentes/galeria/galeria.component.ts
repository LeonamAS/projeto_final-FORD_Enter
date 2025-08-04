import { Component, OnInit} from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Galeria } from '../../models/galeria.interface';
import { images as mockImages } from '../../mockAPI';

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
export class GaleriaComponent implements OnInit {
  images: Galeria[] = mockImages;

  selectedImage: Galeria | null = null;
  selectedIndex: number = -1;
  private modalInstance: any;

  ngOnInit(): void {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  openImageModal(image: Galeria, index: number): void {
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
