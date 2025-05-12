import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // A) Encontra o segmento de rota que carrega o userId
    let current = this.router.routerState.root;
    while (current.firstChild) {
      current = current.firstChild;
    }
    
    current.paramMap.subscribe(params => {
      const id = params.get('userId');
      if (id) {
        this.userId = id;
      } else {
        console.error('userId não encontrado na rota atual');
      }
    });
  }

  userPage() {
    this.router.navigate(['/perfil', 'user', this.userId]);
  }

  historicOrderPage() {
    this.router.navigate(['/perfil', 'user', this.userId, 'historicOrder']);
  }

  manageAddressPage() {
    this.router.navigate(['/perfil', 'user', this.userId, 'manageAddresses']);
  }

  // Faz o logout do utilizador
  logout() {
    // this.router.navigate(['/logout']);
  }

  // Apaga a conta do utilizador
  deleteAccount() {
    // if (confirm('Tem a certeza que pretende apagar a conta?')) {
    //   // Implementar lógica de delete
    // }
  }
}