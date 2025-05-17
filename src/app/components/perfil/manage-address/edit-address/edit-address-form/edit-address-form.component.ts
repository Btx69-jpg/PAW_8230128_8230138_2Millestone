import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddresOrderService } from '../../../../../services/address/addres-order.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { AddressOrder } from '../../../../../model/order/address-order';
import { Address } from '../../../../../model/address';

@Component({
  standalone: true,
  selector: 'app-edit-address-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './edit-address-form.component.html',
  styleUrls: ['./edit-address-form.component.css']
})
export class EditAddressFormComponent implements OnInit, OnChanges {
  @Input() addressOrder!: AddressOrder;
  form!: FormGroup;
  userId!: string;
  addressId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddresOrderService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.addressId = this.route.snapshot.params['addressId'];

    // Inicializamos o form vazio primeiro
    this.inicializarVazioForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['addressOrder'] && this.addressOrder) {
      this.carregarForm();
    }
  }

  private inicializarVazioForm(): void {
    this.form = this.fb.group({
      nif: ['', [Validators.pattern(/^[0-9]{9}$/)]],
      street: ['', [Validators.required, Validators.maxLength(250)]],
      postal_code: ['', [Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{3}$/)]],
      city: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  private carregarForm(): void {
    const { nif, address } = this.addressOrder;

    this.form.setValue({
      nif: nif || '',
      street: address?.street || '',
      postal_code: address?.postal_code || '',
      city: address?.city || ''
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { nif, street, postal_code, city } = this.form.value;
    const address = new Address(street, postal_code, city);
    const updatedAddress = new AddressOrder(this.addressId, address, nif);
    this.update(updatedAddress);
  }

  private update(updateAddress: AddressOrder): void {
    this.addressService.putAddressOrder(this.userId, this.addressId, updateAddress).subscribe({
      next: (response: HttpResponse<AddressOrder>) => {
        if (response.status === 200) {
          this.router.navigate(['../../'], { relativeTo: this.route });
        }
      },
      error: err => console.error('Erro ao atualizar morada', err)
    });
  }
}
