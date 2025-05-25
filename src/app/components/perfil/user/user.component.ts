import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../model/perfil/user';
import { UserService } from '../../../services/user/user.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DadosUserComponent } from './dados-user/dados-user.component';
import { Title } from '@angular/platform-browser';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { StripeService } from '../../../services/Stripe/stripe-services.service';
@Component({
  standalone: true,
  selector: 'app-user',
  imports: [CommonModule, RouterModule, NavBarComponent, DadosUserComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = {} as User;

  constructor(private stripeService:StripeService, private titleService: Title, public userRest: UserService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.titleService.setTitle('Perfil');
    const idTemp = this.route.snapshot.params['userId'];
    this.userRest.getUser(idTemp).subscribe({
        next: (dadosUser: User) => {
          this.user = dadosUser;
        },
        error: (err) => {
          console.error("Erro a carregar o utilizador", err);
        }
    });
  }

  goEditPage(): void {
    this.router.navigate(['editUser'], { relativeTo: this.route });
  }

  goEditPasswordPage(): void {
    this.router.navigate(['changePassword'], { relativeTo: this.route });
  }

  //Teste Checkout
  checkout() {
    this.stripeService.redirectToCheckout();
  }

}
