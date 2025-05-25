import { Component, Input, OnInit } from '@angular/core';
import { HistoricOrderService } from '../../../../services/historicOrder/historic-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../../model/order/order';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/user/order/order.service';

@Component({
  selector: 'app-show-order',
  imports: [CommonModule],
  templateUrl: './show-order.component.html',
  styleUrl: './show-order.component.css'
})
export class ShowOrderComponent implements OnInit {
  order: Order = {} as Order;
  userId!: string;
  @Input() orderId!: string;

  constructor(private historicService: HistoricOrderService, private orderService: OrderService, 
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      this.userId = this.route.snapshot.params['userId'];
      this.orderId = this.route.snapshot.params['orderId'];

      const url = this.router.url;

      if (url.includes('historicOrder')) {
        this.carregarOrderOfHistoric();
      } else if (url.includes('orders')) {
        this.carregarOrder();
      } else {
        console.warn('URL desconhecida, não foi possível carregar pedido.');
      }
      console.log("Show order")
  }

  private carregarOrderOfHistoric(): void {
    this.historicService.getOrderofHistoric(this.userId, this.orderId).subscribe({
      next: (order: Order) => {
        this.order = order;
      },
      error: (error) => {
          console.error("Erro a procurar pelo pedido");
        }
    })
  }

  private carregarOrder(): void {
    this.orderService.getOrder(this.userId, this.orderId).subscribe({
      next: (order: Order) => {
        this.order = order;
      },
      error: (error) => {
          console.error("Erro a procurar pelo pedido");
        }
    })
  }

  voltar() {
    const url = this.router.url;

    if (url.includes('historicOrder')) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else if (url.includes('orders')) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['/']);
    }
  }
}
