import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../../../../model/order/order';
import { OrdersDadosComponent } from '../orders-dados/orders-dados.component';
import { CommonModule } from '@angular/common';
import { FiltroEncomenda, SearchOrdersComponentPerfilUser } from '../search-orders/search-orders.component';

@Component({
  selector: 'app-ordes-lista',
  imports: [SearchOrdersComponentPerfilUser, CommonModule, OrdersDadosComponent],
  templateUrl: './ordes-lista.component.html',
  styleUrl: './ordes-lista.component.css'
})
export class OrdersListaComponent {
  @Input() orders!: Order[];
  @Input() userId!: string;

  @Output() atualizarLista = new EventEmitter<void>();
  @Output() filtraLista = new EventEmitter<FiltroEncomenda>();

  notificarPai() {
    this.atualizarLista.emit();
  }

  onFiltroRecebido(filtro: FiltroEncomenda) {
    this.filtraLista.emit(filtro);
  }
}
