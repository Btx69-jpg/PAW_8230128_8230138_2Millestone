import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HistoricOrderService } from '../../../../services/historicOrder/historic-order.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order } from '../../../../model/order/order';

@Component({
  selector: 'app-search-order',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './search-order.component.html',
  styleUrl: './search-order.component.css'
})
export class SearchOrderComponent {
  @Output() filtroAplicado = new EventEmitter<Order[]>();
  @Input() userId!: string;
  form!: FormGroup;

  constructor(private historicService: HistoricOrderService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    //cliente: ['', Validators.maxLength(100), Validators.pattern("^(?!.*[\\/]).+$")],
    this.userId = this.route.snapshot.params['userId'];
    this.form = this.fb.group({
      nameRest: ['', [Validators.maxLength(100), Validators.pattern("^(?!.*[\\/]).+$")]],
      price: ['', [Validators.min(0)]],
      dateFrom: [''],
      dateTo: [''],
      order: ['']
    });
  }

  limparFiltro() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });

    this.form.reset();
  }

  //Realiza a filtragem dos dados
  filtrar() {
    const rawFiltros = this.form.value;
    console.log("Estou no filtar");

    const filtros = Object.fromEntries(
      Object.entries(rawFiltros).filter(([_, v]) => v !== null && v !== '')
    );
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filtros,
      queryParamsHandling: 'merge', 
    });
    
    this.historicService.getSearchHistoricOrder(this.userId, filtros).subscribe({
      next: (orders: Order[]) => {
        this.filtroAplicado.emit(orders); // o Emit ele vai emitar o valor ao output
      },
      error: (err) => {
        if (err.status === 404) {
            console.log("Erro: O recurso não foi encontrado (404).", err.message);
            this.filtroAplicado.emit([]);
          } else {
            console.error("Erro a carregar o utilizador", err);
          }
      }
    });    
  }

  getRoute() {
    return this.route;
  }
}
