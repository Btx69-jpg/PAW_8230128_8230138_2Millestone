import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user/user.service';
import { PerfilService } from '../../../../services/perfil/perfil.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() userId: string = '';

  constructor(private userService: UserService, private perfilService: PerfilService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
  
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
    this.perfilService.getLogout().subscribe({
      next: () => {
        if (typeof window !== 'undefined') {
            window.location.href = 'http://localhost:3000';
        }  
      },
      error: (err) => {
        console.error('Erro ao fazer logout:', err);
      }
    });
  }

  //Pede ao utilizador para apagar 
  confirmDelete() {
    const confirmed = window.confirm('Tem a certeza que pretende apagar a conta permanentemente?');
    if (confirmed) {
      this.deleteAccount();
    }
  }

  // Apaga a conta do utilizador (Testar)
  deleteAccount() {
    this.userService.deleteUser(this.userId).subscribe({
      next: () => {
        console.log("User eliminado com sucesso");
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Erro a carregar o utilizador", err);
      }
    })
  }
}