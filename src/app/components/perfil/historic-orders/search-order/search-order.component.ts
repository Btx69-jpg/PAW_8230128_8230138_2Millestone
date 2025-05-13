import { Component, Input } from '@angular/core';
import { HistoricOrderService } from '../../../../services/historicOrder/historic-order.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-order',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './search-order.component.html',
  styleUrl: './search-order.component.css'
})
export class SearchOrderComponent {
  @Input() filters!: {
    nameRest?: string;
    price?: number;
    from?: string;
    to?: string;
  };

  form!: FormGroup;

  constructor(private addressService: HistoricOrderService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
  }


  ngOnInit() {
    //cliente: ['', Validators.maxLength(100), Validators.pattern("^(?!.*[\\/]).+$")],
    this.form = this.fb.group({
      nameRest: ['', [Validators.maxLength(100), Validators.pattern("^(?!.*[\\/]).+$")]],
      price: ['', [Validators.min(0)]],
      from: [''],
      to: ['']
    });
  }
  //Realiza a filtragem dos dados
  filtrar() {

  }

  getRoute() {
    return this.route;
  }
}
