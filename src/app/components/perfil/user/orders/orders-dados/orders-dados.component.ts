import { Component, Input } from '@angular/core';
import { Order } from '../../../../../model/order/order';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders-dados',
  imports: [],
  templateUrl: './orders-dados.component.html',
  styleUrl: './orders-dados.component.css'
})
export class OrdersDadosComponent {
  @Input() order!: Order;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  showOrder(orderId: string) {
    this.router.navigate([orderId], { relativeTo: this.route });
  }

  cancelarOrder(orderId: string) {

  }
}
