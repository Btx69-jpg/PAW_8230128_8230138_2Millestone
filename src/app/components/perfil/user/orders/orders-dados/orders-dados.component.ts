import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../../../../model/order/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../../services/user/order/order.service';

@Component({
  selector: 'app-orders-dados',
  imports: [],
  templateUrl: './orders-dados.component.html',
  styleUrl: './orders-dados.component.css'
})
export class OrdersDadosComponent {
  @Input() order!: Order;
  @Input() userId!: string;

  @Output() orderCancelada = new EventEmitter<void>();

  constructor(private orderService:OrderService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
  }

  showOrder(orderId: string) {
    this.router.navigate(['showOrder', orderId], { relativeTo: this.route });
  }

  //Funciona para apagar do utilizador
  cancelarOrder(orderId: string) {
    this.orderService.cancelOrder(this.userId, orderId).subscribe({
      next: () => {
        console.log("A encomenda foi cancelada");
        this.orderCancelada.emit();
      },
      error: (error) => {
        console.error("Erro ao cancelar a encomenda: ", error);
      }
    })
  }
}
