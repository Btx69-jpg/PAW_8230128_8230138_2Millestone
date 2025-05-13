import { Component, Input } from '@angular/core';
import { HistoricOrderService } from '../../../../services/historicOrder/historic-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../../model/order/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-order',
  imports: [CommonModule],
  templateUrl: './show-order.component.html',
  styleUrl: './show-order.component.css'
})
export class ShowOrderComponent {
  order: Order = {} as Order;
  userId!: string;
  @Input() orderId!: string;

  constructor(private historicService: HistoricOrderService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      this.userId = this.route.snapshot.params['userId'];
      this.orderId = this.route.snapshot.params['orderId'];

      this.historicService.getOrderofHistoric(this.userId, this.orderId).subscribe({
        next: (order: Order) => {
          this.order = order;
        },
        error: (error) => {
          console.error("Erro a procurar pelo pedido");
        }
      })
  }

  getRoute() {
    return this.route;
  }

  getRouter() {
    return this.router;
  }
}
