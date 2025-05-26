import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

export interface FiltroEncomenda {
  nameRest: string;
  status: 'all' | 'Pendente' | 'Expedida';
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
  @Output() clearFiltro = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nameRest: ['', [Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9\s]*$/)], ],
      status: ['all']
    });
  }

  filtrar(): void {
    console.log("Filtrar")
    if (this.form.valid) {
      this.filtroMudou.emit({
        nameRest: this.form.value.nameRest.trim(),
        status: this.form.value.status
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  limparFiltro(): void {
    this.form.reset({ nameRest: '', status: 'all' });
    this.clearFiltro.emit();
  }
}
