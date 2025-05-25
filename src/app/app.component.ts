import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './services/webSocket/web-socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'PAW_8230128_8230138_2Millestone';

  constructor(private socketService: WebSocketService, private cookieService: CookieService) {}

  ngOnInit(): void {
    /**
     * * Para depois meter o if real, chamo a função de authGuard para ver se está autenticado e depos
     * * Sacar o id
     */
    //Aqui ver outra forma de sacar o id
    const token = this.cookieService.get('authToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      const userId = decoded?.userId; // depende da estrutura do teu token
      if (userId) {
        this.socketService.connect(userId);
      }
    }
  }
}

//title = 'PAW_8230128_8230138_2Millestone';
//Meter aqui o toast, para assim aparecer em qualquer pagina o aviso 
