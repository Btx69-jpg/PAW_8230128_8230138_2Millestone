import { Component, Input, OnInit } from '@angular/core';
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
  @Input() userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    // this.router.navigate(['/logout']);
  }

  // Apaga a conta do utilizador
  deleteAccount() {
    // if (confirm('Tem a certeza que pretende apagar a conta?')) {
    //   // Implementar lógica de delete
    // }
  }
}