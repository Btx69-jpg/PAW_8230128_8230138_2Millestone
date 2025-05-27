import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {CheckOutService} from '../../../services/user/checkOut/check-out.service';
import { Location } from '@angular/common';
import { Order } from '../../../model/order/order';
import { Item } from '../../../model/order/item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
    imports: [
    CommonModule,    // *ngIf, *ngFor, pipes
    FormsModule      // se usar ngModel
  ]
})
export class CartComponent implements OnInit {
  cart: Order | null = null;
  couponCode = '';

  constructor(
    private cartService: CheckOutService,private location: Location,private route: ActivatedRoute,private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const idTemp = this.route.snapshot.params['userId'];
    this.cartService.getCart(idTemp).subscribe(c => this.cart = c);
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
    // Recalcular o preço total do carrinho
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

  goToCheckoutDelivery() {
    const userId = this.route.snapshot.params['userId'];
    this.router.navigate([`delivery`], { relativeTo: this.route});
  }

  proceedToCheckout(cart: Order) {
  if (cart) {
    console.log('Proceeding to checkout with cart:', cart);
    const idTemp = this.route.snapshot.params['userId'];
    this.cartService.save(idTemp, cart).subscribe(() => {
      this.goToCheckoutDelivery();
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
}
