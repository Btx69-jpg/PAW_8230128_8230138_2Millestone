import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../../model/order/order';
import { HistoricOrderService } from '../../../../services/historicOrder/historic-order.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-historic-order',
  imports: [CommonModule],
  templateUrl: './lista-historic-order.component.html',
  styleUrl: './lista-historic-order.component.css'
})
export class ListaHistoricOrderComponent implements OnInit {
  @Input() historicOrder: Order[] = [];
  userId: string = "";

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
  }

  showOrder(orderId: string) {
    this.router.navigate([orderId], { relativeTo: this.route });
  }

  addComment(order: Order): void {
    this.userId = this.route.snapshot.paramMap.get('userId')!;

    this.router.navigate(
      [`/perfil/user/${this.userId}/historicOrder/createComment`],
      {
        state: {
          orderId: order._id,
          restName: order.restaurant.name,
          orderDate: order.date
        }
      });
  }

  editComment(orderId: string): void {
    // Abrir modal ou redirecionar para editar
    console.log('Editar comentário de:', orderId);
  }

  deleteComment(orderId: string): void {
    // Confirmar e apagar comentário
    console.log('Apagar comentário de:', orderId);
  }
}
