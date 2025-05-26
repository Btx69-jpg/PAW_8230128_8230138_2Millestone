import { Component, Input } from '@angular/core';
import { Order } from '../../../../../model/order/order';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../../../services/user/order/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { OrdersListaComponent } from '../ordes-lista/ordes-lista.component';
import { FiltroEncomenda } from '../search-orders/search-orders.component';
import { UserService } from '../../../../../services/user/user.service';
import { ToastService } from '../../../../../services/features/toast/toast-service.service';

@Component({
  selector: 'app-ordes-page',
  imports: [NavBarComponent, OrdersListaComponent, RouterModule],
  templateUrl: './ordes-page.component.html',
  styleUrl: './ordes-page.component.css'
})
export class OrdersPageComponent {
  userId: string = "";
  orders: Order[] = [];
  isBaned: boolean = false;
  constructor(private orderService: OrderService, private userService: UserService, private toastService:ToastService,
    private route: ActivatedRoute,private router: Router) {}
  
  ngOnInit() {
    if (this.route.snapshot.queryParams['payment'] === 'success') {
      this.router.navigate([], { 
        queryParams: {},
        replaceUrl: true // Mantém o histórico limpo
      });

      // Mostra o toast
      this.toastService.show('Pagamento concluído com sucesso!', 'success');
    }

    console.log('ngOnInit chamado');
    this.userId = this.route.snapshot.params['userId'];
    console.log('userId carregado:', this.userId);
    this.carregarOrders();

    this.isBan();
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

  isBan(): void {
    this.userService.getIsUserBannedOrder(this.userId).subscribe({
      next: (isBanned: boolean) => {
        this.isBaned = isBanned;
        console.log("O utilizador está: ", isBanned);
      }, error: (error: HttpErrorResponse) => {
        console.error("Erro a carregar o utilizador", error);
      }
    })
  }

  filtrar(filtro: FiltroEncomenda) {
    console.log("Filtro: ", filtro);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filtro,
      queryParamsHandling: 'merge', 
    });

    this.orderService.searchOrders(this.userId, filtro).subscribe({
      next: (ordersDados: Order[]) => {
        this.orders = ordersDados;
        console.log("Novas encomendas: ", ordersDados);
      }, error: (error: HttpErrorResponse) => {
        console.error("Erro a carregar o utilizador", error);
      }
    })
  }

  clear() {
    console.log("Limpar filtro")
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
    this.carregarOrders();
  }
}
