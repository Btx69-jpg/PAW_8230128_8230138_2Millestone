import { Component, OnInit } from '@angular/core';
import {CheckOutService} from '../../../services/user/checkOut/check-out.service';
import { Location } from '@angular/common';
import { Order } from '../../../model/order/order';
import { Item } from '../../../model/order/item';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Order | null = null;
  couponCode = '';

  constructor(
    private cartService: CheckOutService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(c => this.cart = c);
  }

  onQuantityChange(item: Item, newQty: number) {
    item.quantity = newQty;
    this.cartService.updateQuantity(item).subscribe(c => this.cart = c);
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => this.loadCart());
  }

  goBack() {
    this.location.back();
  }
}
