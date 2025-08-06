import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

interface Message {
  message: string;
  type: 'success' | 'danger' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new Subject<Message>();
  message$: Observable<Message> = this.messageSubject.asObservable();

  constructor() { }

  emitirMensagem(message: string, type: 'success' | 'danger' | 'warning'): void {
    this.messageSubject.next({ message, type });
  }
}