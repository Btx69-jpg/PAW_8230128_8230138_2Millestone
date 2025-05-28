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
import { Restaurant } from '../../../model/perfil/restaurant';

import { FaturaCliente } from '../../../model/order/fatura-cliente';
import { FaturaRestaurant } from '../../../model/order/fatura-restaurant';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  user: User | null = null;
  restaurant: Restaurant | null = null;
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

      // Verifica se o utilizador tem um carrinho e se tem itens
      if (this.user.cart && this.user.cart.itens[0]) {
        const restId = this.user.cart.itens[0].from;

        // Verifica se é para criar ordem após pagamento
        let shouldCreateOrder = false;
        let checkoutOptions: any = null;

        this.route.queryParams.subscribe(params => {
          const paymentStatus = params['payment'];
          if (paymentStatus === 'success') {
            const options = localStorage.getItem('checkoutOptions');
            if (options) {
              const { selectedOption, selectedAddressId, cart } = JSON.parse(options);
              this.selectedOption = selectedOption;
              this.selectedAddressId = selectedAddressId;
              if (cart && this.user) this.user.cart = cart;
              localStorage.removeItem('checkoutOptions');
            }
            shouldCreateOrder = true;
          }
        });

        this.CheckOutService.getRestaurant(restId).subscribe({
          next: (restaurant: Restaurant) => {
            this.restaurant = restaurant;
            // Só cria a ordem depois de ter o restaurante
            if (shouldCreateOrder) {
              this.handleOrderCreation();
            }
          },
          error: (err) => {
            console.error('Erro ao obter restaurante', err);
          },
        });
      } else {
        this.restaurant = {} as Restaurant;
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
    return dishFotoPath
      ? `${environment.apiUrl}${dishFotoPath}`
      : '/assets/img/no-image.png';
  }

  goToPayment() {
    const idTemp = this.route.snapshot.params['userId'];
    // Salva também o carrinho no localStorage!
    localStorage.setItem(
      'checkoutOptions',
      JSON.stringify({
        selectedOption: this.selectedOption,
        selectedAddressId: this.selectedAddressId,
        cart: this.user?.cart // <-- guardar o carrinho!
      })
    );
    this.stripeService.redirectToCheckout(idTemp.toString());
  }

  /**
   * Handles order creation and persistence after payment success
   */
  private handleOrderCreation() {
    if (!this.user || !this.user.cart || !this.user.cart.itens.length) return;
    const cart = this.user.cart;
    const perfil = this.user.perfil;
    const now = new Date();

    // Build FaturaCliente
    const client = new FaturaCliente(
      this.user._id,
      this.user.firstName,
      this.user.lastName,
      perfil.phoneNumber,
      perfil.email
    );

    // Build FaturaRestaurant
    const restId = cart.itens[0].from;
    const restaurant = new FaturaRestaurant(
      restId,
      this.restaurant?.name || 'Restaurante Desconhecido',
      this.restaurant?.nif || 999999999, //ALTERAR QUANDO O ARTUR FIZER O MODEL DO RESTAURANTE
      'restaurante@email.com'
    );

    let addressOrder: AddressOrder | undefined;
    if (this.selectedOption === 'home') {
      const selected = this.user.addresses.find(
        (a) => a._id === this.selectedAddressId
      );
      if (!selected) {
        // Mostrar um toast aqui
        console.error('Nenhuma morada selecionada para entrega.');
        return;
      }
      addressOrder = selected;
    } else {
      //caso queira pegar no restaurante
      addressOrder = new AddressOrder(
        'pickup',
        new Address(
          this.restaurant && this.restaurant.address ? this.restaurant.address.street : '',
          this.restaurant && this.restaurant.address ? this.restaurant.address.postal_code : '',
          this.restaurant && this.restaurant.address ? this.restaurant.address.city : ''
        ),
        999999999
      );
    }

    // criação da ordem
    const order = new Order(
      '', //id vai ser gerado no backend
      now,
      client,
      restaurant,
      addressOrder,
      cart.itens,
      cart.price,
      'Pendente',
      this.selectedOption === 'home' ? 'delivery' : 'pickup',
      '', // comment
      '' // commentPhoto
    );

    // salva a ordem no user e no restaurante
    this.CheckOutService.saveNewOrder(this.user._id, restId, order).subscribe({
      next: (savedOrder: Order) => {
        // TODO dar um toast de feedback de sucesso

        // direciona para a pagina do historico de encomendas
        this.router.navigate([`perfil/user/${this.user?._id}/orders`], {
          queryParams: {},
          replaceUrl: true,
        });
      },
      error: (err) => {
        console.error('Erro ao criar encomenda', err);
      },
    });
  }
}
