import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface FiltroEncomenda {
  nomeRestaurante: string;
  status: 'todos' | 'pendente' | 'expedidas';
}

@Component({
  selector: 'app-search-orders',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './search-orders.component.html',
  styleUrl: './search-orders.component.css'
})
export class SearchOrdersComponentPerfilUser implements OnInit {
  form!: FormGroup;

  @Output() filtroMudou = new EventEmitter<FiltroEncomenda>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nameRest: [
        '',
        [Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9\s]*$/)],
      ],
      status: ['todos']
    });
  }

  filtrar(): void {
    if (this.form.valid) {
      this.filtroMudou.emit({
        nomeRestaurante: this.form.value.nameRest.trim(),
        status: this.form.value.status
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  limparFiltro(): void {
    this.form.reset({ nameRest: '', status: 'todos' });
    this.filtroMudou.emit({
      nomeRestaurante: '',
      status: 'todos'
    });
  }
}
