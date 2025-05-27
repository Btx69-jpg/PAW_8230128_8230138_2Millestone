import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../../../../model/order/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../../services/user/order/order.service';
import { CommonModule } from '@angular/common';
import { time } from 'console';

@Component({
  selector: 'app-orders-dados',
  imports: [CommonModule],
  templateUrl: './orders-dados.component.html',
  styleUrl: './orders-dados.component.css'
})
export class OrdersDadosComponent {
  @Input() order!: Order;
  @Input() userId!: string;
  @Input() isBaned: boolean = false;
  timeToCancel: boolean =false;

  @Output() orderCancelada = new EventEmitter<void>();

  constructor(private orderService:OrderService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.verificarTempoCancelar();
  }

  verificarTempoCancelar() {
    const dataAtual = Date.now();
    const tempoOrder = dataAtual - new Date(this.order.date).getTime();
    const cincoMinutos = 5 * 60 * 1000;

    if(tempoOrder <= cincoMinutos) {
      this.timeToCancel = true;
    } else {
      this.timeToCancel = false
    }
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
