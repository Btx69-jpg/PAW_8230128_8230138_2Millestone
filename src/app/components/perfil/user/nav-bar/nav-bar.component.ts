import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  //Depois com as rotas feitas, alterar
  links = [
    { 
      path: '/perfil/user', 
      title: 'Meu Perfil',
      icon: 'bi-person-badge-fill' 
    },
    { 
      path: '/perfil/admin/historicOrder', 
      title: 'Histórico de Encomendas',
      icon: 'bi-clock-history' 
    },
    { 
      path: '/perfil/admin/manageAddresses', 
      title: 'Gerir Moradas',
      icon: 'bi-geo-alt-fill' 
    },
  ];

  constructor(private router: Router) {}

  //Faz o logout do utilizador
  logout() {
    //this.router.navigate(['/logout']);
  }

  //Apaga a conta do utilizador
  deleteAccount() {
    //if(confirm('Tem a certeza que pretende apagar a conta?')) {
      // Implementar lógica de delete
    //}
  }
}
