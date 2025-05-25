import { Component, Input } from '@angular/core';
import { Order } from '../../../../../model/order/order';

@Component({
  selector: 'app-products-list',
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  @Input() cart: Order[] = []
}
