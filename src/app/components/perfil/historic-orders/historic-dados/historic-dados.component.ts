import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../../model/order/order';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricOrderService } from '../../../../services/historicOrder/historic-order.service';
import { NavBarComponent } from '../../user/nav-bar/nav-bar.component';
import { ShowOrderComponent } from '../show-order/show-order.component';

@Component({
  selector: 'app-historic-dados',
  imports: [NavBarComponent, ShowOrderComponent],
  templateUrl: './historic-dados.component.html',
  styleUrl: './historic-dados.component.css'
})
export class HistoricDadosComponent implements OnInit {
  historicOrder: Order[] = [];
  orderId!: string;
  userId!: string;

  constructor(private historicService: HistoricOrderService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.orderId = this.route.snapshot.params['orderId'];
    
    this.historicService.getHistoricOrder(this.userId).subscribe({
      next: (historicOrder: Order[]) => {
        this.historicOrder = historicOrder;
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
