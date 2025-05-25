import { Component, Input } from '@angular/core';
import { Order } from '../../../../../model/order/order';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../../../services/user/order/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { OrdersListaComponent } from '../ordes-lista/ordes-lista.component';

@Component({
  selector: 'app-ordes-page',
  imports: [NavBarComponent, OrdersListaComponent, RouterModule],
  templateUrl: './ordes-page.component.html',
  styleUrl: './ordes-page.component.css'
})
export class OrdersPageComponent {
  userId!: string 
  orders: Order[] = []
  constructor(private orderService: OrderService, private route: ActivatedRoute,private router: Router) {}
  
  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.carregarOrders();
  }

  carregarOrders() {
    this.orderService.getOrders(this.userId).subscribe({
      next: (ordersDados: Order[]) => {
        this.orders = ordersDados;
      }, error: (error: HttpErrorResponse) => {
        console.error("Erro a carregar o utilizador", error);
      }
    })
  } 
}
