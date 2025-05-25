import { Component, OnInit } from '@angular/core';
import { ShowOrderComponent } from '../../../historic-orders/show-order/show-order.component';
import { ActivatedRoute,Router } from '@angular/router';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

@Component({
  selector: 'app-order-details',
  imports: [NavBarComponent, ShowOrderComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{
  userId!: string;
  orderId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.orderId = this.route.snapshot.params['orderId'];
  }

}
