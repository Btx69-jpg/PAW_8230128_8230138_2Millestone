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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  showOrder(orderId: string) {
    this.router.navigate([orderId], { relativeTo: this.route });
  }
}
