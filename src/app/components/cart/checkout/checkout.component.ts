import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../model/order/order';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../model/perfil/user';
import { UserService } from '../../../services/user/user.service';
import { Title } from '@angular/platform-browser';
import { AddressOrder } from '../../../model/order/address-order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  cart: Order | null = null;
  user: User | null = null;
  selectedOption = 'home'; // 'home' ou 'store'
  selectedAddressId: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public userRest: UserService, 
    private titleService: Title
  ) {}

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

  goToPayment() {
    this.router.navigate(['/checkout/payment', this.route.snapshot.params['userId']]);
  }

  goBack() {
    this.location.back();
  }

  selectAddress(addressId: string) {
  this.selectedAddressId = addressId;
  // Aqui também podes atualizar o endereço de entrega no `cart`, se necessário
  }

  editAddress(address: AddressOrder) {
    // Abre modal ou navega para página de edição
    console.log('Editar endereço:', address);
  }
}