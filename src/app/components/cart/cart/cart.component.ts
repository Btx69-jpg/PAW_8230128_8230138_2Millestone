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

  onQuantityChange(item: Item, newQty: number) {
    item.quantity = newQty;
    //this.cartService.updateQuantity(item).subscribe(c => this.cart = c);
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => this.loadCart());
  }

  goBack() {
    this.location.back();
  }
}
