import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: Socket;
  private userId: string = '';
  
  constructor(private snackBar: MatSnackBar) {}

  connect(userId: string) {
    this.userId = userId;
    this.socket = io('http://localhost:3000');
    this.socket.emit('register', this.userId);

    this.socket.on('encomenda-concluida', (data) => {
      this.snackBar.open(data.mensagem, 'Fechar', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
    });
  }
}
