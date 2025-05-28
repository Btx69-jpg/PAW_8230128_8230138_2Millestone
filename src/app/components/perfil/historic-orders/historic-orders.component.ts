import { Component, OnInit } from '@angular/core';
import { Order } from '../../../model/order/order';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from '../user/nav-bar/nav-bar.component';
import { ListaHistoricOrderComponent } from './lista-historic-order/lista-historic-order.component';
import { HistoricOrderService } from '../../../services/historicOrder/historic-order.service';
import { SearchOrderComponent } from './search-order/search-order.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-historic-orders',
  imports: [NavBarComponent, ListaHistoricOrderComponent, SearchOrderComponent],
  templateUrl: './historic-orders.component.html',
  styleUrl: './historic-orders.component.css'
})
export class HistoricOrdersComponent implements OnInit {
    historicOrder: Order[] = [];
    userId: string = '';
  
    constructor(private historicService: HistoricOrderService, private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit(): void {
      this.userId = this.route.snapshot.params['userId'];
      this.carregarHistorico();
    }

    atualizarHistorico(orders: Order[]): void {
      this.historicOrder = orders;
    }

    clearFiltro(): void {
      console.log("Filtro limpo")
      this.carregarHistorico();
    }
  
    carregarHistorico(): void {
      this.historicService.getHistoricOrder(this.userId).subscribe({
        next: (orders: Order[]) => {
          this.historicOrder = orders;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.historicOrder = [];
            console.log("Erro: O recurso não foi encontrado (404).", err.message);
          } else {
            console.error("Erro a carregar o utilizador", err);
          }
        }
      });
    }
}
