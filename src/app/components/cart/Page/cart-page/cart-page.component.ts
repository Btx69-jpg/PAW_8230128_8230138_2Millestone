import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../../model/order/order';
import { ProductsListComponent } from './products-list/products-list.component';
import { ResumeComponent } from './resume/resume.component';

@Component({
  selector: 'app-cart-page',
  //imports: [ProductsListComponent, ResumeComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{
  cart: Order[] = []

  ngOnInit(): void {
    this.carregarCart();
  }

  private carregarCart() {
    //Vai buscar ao localhost
  }
}
