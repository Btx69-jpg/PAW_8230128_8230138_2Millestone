import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {CheckOutService} from '../../../services/user/checkOut/check-out.service';
import { Location } from '@angular/common';
import { Order } from '../../../model/order/order';
import { Item } from '../../../model/order/item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Restaurant } from '../../../model/perfil/restaurant';
import { Address } from '../../../model/address';
import { SafeUrlPipe } from './mapa/safe-url.pipe';
import { ToastService } from '../../../services/features/toast/toast-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
    imports: [
    CommonModule,
    FormsModule,
    SafeUrlPipe 
  ]
})
export class CartComponent implements OnInit {
  restaurante: Restaurant | null = null;
  cart: Order | null = null;
  couponCode = '';

  previousQuantities = new Map<Item, number>();

  constructor(
    private cartService: CheckOutService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService // <-- injeta o serviço de toast
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.carregarCart();
  }

  private formatAddress(address: Address): string {
    return `${address.street}, ${address.postal_code} ${address.city}`;
  }
  //Vai buscar o mapa do google maps
  getGoogleMapsUrl(address: Address): string {
    const formattedAddress = this.formatAddress(address);
    const encodedAddress = encodeURIComponent(formattedAddress);
    return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  }

  isRestauranteAberto(): boolean {
    if (!this.restaurante) return false;
    const now = new Date();
    const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    return currentSeconds >= this.restaurante.openingTime && currentSeconds < this.restaurante.closingTime;
  }

  formatHour(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  private carregarCart(): void {
    const idTemp = this.route.snapshot.params['userId'];
    this.cartService.getCart(idTemp).subscribe({
      next: (cart: Order) => {
        this.cart = cart;
        if(this.cart.itens) {
          this.carregarRest(this.cart.itens[0].from);
        }
      },
      error: (error) => {
        console.error("Erro ao carregar o carrinho: ", error);
      }
    });
  }

  private carregarRest(restId: string): void {
    this.cartService.getRestaurant(restId).subscribe({
      next: (restaurant: Restaurant) => {
        this.restaurante = restaurant;
        console.log("Restaurante: ", this.restaurante);
        this.previousQuantities.clear();
        if (this.cart && this.cart.itens) {
          for (const item of this.cart.itens) {
            this.previousQuantities.set(item, item.quantity);
          }
        }

      }
    })
  }

  onSafeQuantityChange(cart: Order, item: Item, value: any) {
    //Verifica se o valor foi apagado ou é igual ou menor que 0
    if (value === '' || value === null || isNaN(value) || value <= 0) {
      setTimeout(() => {
        item.quantity = 1;
        this.cdr.detectChanges(); 
        this.onQuantityChange(cart, item, 1);
      });
      return;
    }

    const sanitizedValue = Number(value);
    item.quantity = sanitizedValue;
    this.onQuantityChange(cart, item, sanitizedValue);
  }

  private onQuantityChange(cart: Order, item: Item, newQty: number) {
    if (!this.restaurante) return;

    let totQuantity = 0;
    let posItem = -1;

    for (let i = 0; i < cart.itens.length; i++) {
      const itemAtual = cart.itens[i];
      if (itemAtual === item) {
        posItem = i;
      } else {
        totQuantity += itemAtual.quantity;
      }
    }

    const limite = this.restaurante.maxOrdersPerClient;

    if (newQty < 0 || isNaN(newQty)) {
      newQty = 0;
    }

    // Verifica se o novo valor ultrapassa o limite
    if (posItem === -1 || (totQuantity + newQty > limite)) {
      const previousQty = this.previousQuantities.get(item) ?? item.quantity;

      console.warn("Limite excedido! Valor revertido para:", previousQty);

      setTimeout(() => {
        item.quantity = previousQty;
        this.cdr.detectChanges();
      });

      this.cart = cart;
      return;
    }

    cart.itens[posItem].quantity = newQty;
    this.previousQuantities.set(item, newQty);

    cart.price = cart.itens.reduce((total, i) => total + i.price * i.quantity, 0);
  }

  clearCart() {
    const idTemp = this.route.snapshot.params['userId'];
    this.cartService.clearCart(idTemp).subscribe(() => this.loadCart());
  }

  goBack() {
    this.location.back();
  }

  private goToCheckoutDelivery(): void {
    console.log("Go to Checkout");
    this.router.navigate([`delivery`], { relativeTo: this.route});
  }

  proceedToCheckout(cart: Order) {
    const isRestAberto = this.isRestauranteAberto();
    if (!isRestAberto) {
      this.toastService.show('O restaurante está fechado. Não é possível finalizar o pedido neste momento.', 'error');
      return;
    }
    if (cart && isRestAberto) {
      const idTemp = this.route.snapshot.params['userId'];
      this.cartService.save(idTemp, cart).subscribe({
        next: () => {
          this.goToCheckoutDelivery();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  saveCart(cart: Order) {
    if (cart) {
        const idTemp = this.route.snapshot.params['userId'];
        this.cartService.save(idTemp,cart).subscribe(() => {
        this.loadCart();
      });
    }
  }

  removeItem(index: number) {
    if (this.cart && this.cart.itens) {
      this.cart.itens.splice(index, 1);
      // Atualiza o preço total
      this.cart.price = this.cart.itens.reduce((total, i) => total + (i.price * i.quantity), 0);
      // Salva o carrinho atualizado
      const idTemp = this.route.snapshot.params['userId'];
      this.cartService.save(idTemp, this.cart).subscribe(() => {
        this.loadCart();
      });
    }
  }

  getTotalQuantity(): number {
    if (!this.cart || !this.cart.itens) return 0;
    return this.cart.itens.reduce((total, item) => total + item.quantity, 0);
  }
}
