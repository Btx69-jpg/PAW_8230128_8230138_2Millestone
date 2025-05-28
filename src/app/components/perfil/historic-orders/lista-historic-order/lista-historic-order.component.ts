import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../../model/order/order';
import { HistoricOrderService } from '../../../../services/historicOrder/historic-order.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../../../services/comments/comment-service.service';

@Component({
  selector: 'app-lista-historic-order',
  imports: [CommonModule],
  templateUrl: './lista-historic-order.component.html',
  styleUrl: './lista-historic-order.component.css'
})
export class ListaHistoricOrderComponent implements OnInit {
  @Input() historicOrder: Order[] = [];
  userId: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private commentService: CommentService) {}

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
          orderDate: order.date,
        }
      });
  }

  editComment(order: Order): void {
    this.userId = this.route.snapshot.paramMap.get('userId')!;

    this.router.navigate(
      [`/perfil/user/${this.userId}/historicOrder/editComment`],
      {
        state: {
          orderId: order._id,
          restName: order.restaurant.name,
          orderDate: order.date,
          existingComment: order.comment
        }
      });
  }

  deleteComment(orderId: string): void {
    this.commentService.deleteComment(this.userId, orderId).subscribe({
      next: () => {
        const order = this.historicOrder.find(o => o._id === orderId);

        if (order) {
          order.comment = '';
          order.commentPhoto = '';
        }
        console.log("Comentário eliminado com sucesso");
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
