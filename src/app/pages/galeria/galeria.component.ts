import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';

import { Galeria } from '../../models/galeria.interface';
import { images as mockImages } from '../../mockAPI';
import { RodapeComponent } from '../../componentes/rodape/rodape.component';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';


declare var bootstrap: any;

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [
    CabecalhoComponent,
    RodapeComponent,
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent implements OnInit, OnDestroy {
  images: Galeria[] = [];
  selectedImage: Galeria | null = null;
  selectedIndex: number = -1;
  private modalInstance: any;

  isAdmin: boolean = false;
  newImage: Galeria = { src: '', alt: '', title: '' };
  private readonly GALLERY_STORAGE_KEY = 'galleryImages';
  private destroy$ = new Subject<void>();
  imageToRemove: Galeria | null = null;
  private confirmDeleteModalInstance: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userRole$.pipe(
      map(role => role === 'admin'),
      takeUntil(this.destroy$)
    ).subscribe(isAdmin => this.isAdmin = isAdmin);

    this.loadImages();

    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }

    const confirmModalElement = document.getElementById('confirmDeleteModal');
    if (confirmModalElement) {
      this.confirmDeleteModalInstance = new bootstrap.Modal(confirmModalElement);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadImages(): void {
    const storedImages = localStorage.getItem(this.GALLERY_STORAGE_KEY);
    if (storedImages) {
      this.images = JSON.parse(storedImages) as Galeria[];
    } else {
      this.images = [...mockImages];
      this.saveImages();
    }
  }

  private saveImages(): void {
    localStorage.setItem(this.GALLERY_STORAGE_KEY, JSON.stringify(this.images));
  }

  onAddImage(form: NgForm): void {
    if (form.valid) {
      this.images.unshift({ ...this.newImage });
      this.saveImages();
      form.resetForm();
      this.newImage = { src: '', alt: '', title: '' };
    }
  }

  onRemoveImage(imageToRemove: Galeria): void {
    if (!this.isAdmin) {
      console.warn('Acesso negado: Apenas administradores podem remover imagens.');
      return;
    }
    this.imageToRemove = imageToRemove;
    if (this.confirmDeleteModalInstance) {
      this.confirmDeleteModalInstance.show();
    }
  }

  confirmRemoval(): void {
    if (this.imageToRemove) {
      this.images = this.images.filter(image => image.src !== this.imageToRemove!.src);
      this.saveImages();
      this.imageToRemove = null;
      this.closeImageModal();
      if (this.confirmDeleteModalInstance) {
        this.confirmDeleteModalInstance.hide();
      }
    }
  }

  cancelRemoval(): void {
    this.imageToRemove = null;
    if (this.confirmDeleteModalInstance) {
      this.confirmDeleteModalInstance.hide();
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
