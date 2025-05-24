import { Component, Input } from '@angular/core';
import { Order } from '../../../../../model/order/order';
import { OrdersDadosComponent } from '../orders-dados/orders-dados.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordes-lista',
  imports: [CommonModule, OrdersDadosComponent],
  templateUrl: './ordes-lista.component.html',
  styleUrl: './ordes-lista.component.css'
})
export class OrdersListaComponent {
  @Input() orders!: Order[]
}
