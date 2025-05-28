import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../model/order/order';
import { Address } from '../../../model/address';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../model/perfil/user';
import { UserService } from '../../../services/user/user.service';
import { CheckOutService } from '../../../services/user/checkOut/check-out.service';
import { AddresOrderService } from '../../../services/address/addres-order.service';
import { Title } from '@angular/platform-browser';
import { AddressOrder } from '../../../model/order/address-order';
import { newAddressOrder } from '../../../model/order/newAddressOrder';
import { environment } from '../../../enviroments/enviroment';
import { StripeService } from '../../../services/Stripe/stripe-services.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  user: User | null = null;
  restaurantName: string = '';
  restaurantAddress: string = '';
  selectedOption = 'home'; // 'home' ou 'store'
  selectedAddressId: string | null = null;
  showAddressForm = false;
  editingAddressId: string | null = null;
  addressData = { nif: 0, street: '', postal_code: '', city: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public userRest: UserService,
    private titleService: Title,
    private AddresOrderService: AddresOrderService,
    private CheckOutService: CheckOutService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Perfil');
    const idTemp = this.route.snapshot.params['userId'];
    this.userRest.getUser(idTemp).subscribe({
      next: (dadosUser: User) => {
        this.user = dadosUser;

        if (this.user.cart && this.user.cart.itens[0]) {
          const restId = this.user.cart.itens[0].from;
          this.CheckOutService.getRestNameAndAddress(restId).subscribe({
            next: (data) => {
              this.restaurantName = data.restaurantName;
              this.restaurantAddress = data.restaurantAddress;
            },
            error: (err) => {
              console.error(
                'Erro ao obter nome e endereço do restaurante',
                err
              );
            },
          });
        } else {
          this.restaurantName = '';
          this.restaurantAddress = '';
        }
      },
      error: (err) => {
        console.error('Erro a carregar o utilizador', err);
      },
    });
  }

  goBack() {
    this.location.back();
  }

  selectAddress(addressId: string) {
    this.selectedAddressId = addressId;
  }

  editAddress(address: AddressOrder) {
    console.log('Editar endereço:', address);
  }

  getTotalQuantity(): number {
    if (!this.user || !this.user.cart || !this.user.cart.itens) return 0;
    return this.user.cart.itens.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  startCreateAddress() {
    this.showAddressForm = true;
    this.editingAddressId = null;
    this.addressData = { nif: 0, street: '', postal_code: '', city: '' };
  }

  startEditAddress(address: AddressOrder) {
    this.showAddressForm = true;
    this.editingAddressId = address._id;
    this.addressData = {
      nif: address.nif || 0,
      street: address.address.street,
      postal_code: address.address.postal_code,
      city: address.address.city,
    };
  }

  cancelAddressEdit() {
    this.showAddressForm = false;
    this.editingAddressId = null;
    this.addressData = { nif: 0, street: '', postal_code: '', city: '' };
  }

  onSubmitAddress(form: any) {
    if (form.invalid) return;
    const userId = this.route.snapshot.params['userId'];
    const { nif, street, postal_code, city } = this.addressData;
    const address = new Address(street, postal_code, city);

    if (this.editingAddressId) {
      // Editar morada existente
      const addressOrder = new AddressOrder(
        this.editingAddressId,
        address,
        nif ? nif : undefined
      );
      this.AddresOrderService.putAddressOrder(
        userId,
        this.editingAddressId,
        addressOrder
      ).subscribe({
        next: () => {
          this.showAddressForm = false;
          this.editingAddressId = null;
          this.ngOnInit(); // Recarrega dados do utilizador
        },
      });
    } else {
      // Criar nova morada
      const addressOrder = new newAddressOrder(address, nif ? nif : undefined);
      this.AddresOrderService.postAddressOrder(userId, addressOrder).subscribe({
        next: () => {
          this.showAddressForm = false;
          this.ngOnInit(); // Recarrega dados do utilizador
        },
      });
    }
  }

  fullDishImagePath(dishFotoPath: string) {
    return dishFotoPath ? `${environment.apiUrl}${dishFotoPath}` : '/assets/img/no-image.png';
  }
  
  goToPayment() {
    const idTemp = this.route.snapshot.params['userId'];
    this.stripeService.redirectToCheckout(idTemp.toString());
  }

}
