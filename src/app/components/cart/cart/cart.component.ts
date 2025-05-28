import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {CheckOutService} from '../../../services/user/checkOut/check-out.service';
import { Location } from '@angular/common';
import { Order } from '../../../model/order/order';
import { Item } from '../../../model/order/item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Restaurant } from '../../../model/perfil/restaurant';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
    imports: [
    CommonModule,
    FormsModule
  ]
})
export class CartComponent implements OnInit {
  restaurante: Restaurant | null = null;
  cart: Order | null = null;
  couponCode = '';

  constructor(
    private cartService: CheckOutService,private location: Location,private route: ActivatedRoute,private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.carregarCart();
  }

  private carregarCart(): void {
    const idTemp = this.route.snapshot.params['userId'];
    this.cartService.getCart(idTemp).subscribe({
      next: (cart: Order) => {
        this.cart = cart;
      },
      error: (error) => {
        console.error("Erro ao carregar o carrinho: ", error);
      }
    });
  }

  private carregarRest(restId: string): void {
    
  }

  onQuantityChange(cart: Order, item: Item, newQty: number) {
    for (const i of cart.itens) {
      if (i === item) {
        if (newQty < 0) {
          newQty = 0;
        } else {
          i.quantity = newQty;
        }
      }
    }
 
    cart.price = cart.itens.reduce((total, i) => total + (i.price * i.quantity), 0);
    this.cart = cart;
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
    if (cart) {
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
