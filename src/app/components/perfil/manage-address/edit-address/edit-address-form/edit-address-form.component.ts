import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddresOrderService } from '../../../../../services/address/addres-order.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { AddressOrder } from '../../../../../model/order/address-order';
import { Address } from '../../../../../model/address';

@Component({
  standalone: true,
  selector: 'app-edit-address-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule , HttpClientModule],
  templateUrl: './edit-address-form.component.html',
  styleUrl: './edit-address-form.component.css'
})
export class EditAddressFormComponent {
  @Input() addressOrder: AddressOrder = {
    nif: undefined,
    address: { street: '', postal_code: '', city: '' }
  } as AddressOrder

  userId!: string;
  addressId!: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private addressService: AddresOrderService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.addressId = this.route.snapshot.params['addressId'];
  }

  getRoute(){
    return this.route
  }

  getRouter() {
    return this.router;
  }

  //Metodo para atualizar a morada
  update(formValues: any) {
    console.log("FormValue: ", formValues);
      const nif = formValues.nif;
      const street = formValues['address.street'];
      const postal_code = formValues['address.postal_code'];
      const city  = formValues['address.city'];
      const address = new Address(street, postal_code, city);

      const updatedAddress = new AddressOrder(this.addressId, address, nif);

      this.addressService.putAddressOrder(this.userId, this.addressId, updatedAddress).subscribe({
        next: (response: HttpResponse<AddressOrder>) => {

          const status = response.status;
          if (status=== 200) {
            this.router.navigate(['../../'], { relativeTo: this.route })
          }
          
        },
        error: err => console.error('Erro ao remover morada', err)
      })
  }
}
