import { Component, Input } from '@angular/core';
import { Address } from '../../../../../model/address';
import { AddressOrder } from '../../../../../model/order/address-order';
import { HttpResponse } from '@angular/common/http';
import { AddresOrderService } from '../../../../../services/address/addres-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { newAddressOrder } from '../../../../../model/order/newAddressOrder';

@Component({
  selector: 'app-create-address-form',
  imports: [],
  templateUrl: './create-address-form.component.html',
  styleUrl: './create-address-form.component.css'
})
export class CreateAddressFormComponent {
  @Input() userId!: string;
  
  constructor(private addressService: AddresOrderService, private route: ActivatedRoute, private router: Router) {}

  saveAddress(formValues: any) {
    const nif = formValues.nif;
    const street = formValues['address.street'];
    const postal_code = formValues['address.postal_code'];
    const city  = formValues['address.city'];
    const address = new Address(street, postal_code, city);
    const addressOrder = new newAddressOrder(address, nif);

    this.addressService.postAddressOrder(this.userId, addressOrder).subscribe({
      next: (response: HttpResponse<newAddressOrder>) => {

        const status = response.status;
        if (status=== 200) {
          this.router.navigate(['../../'], { relativeTo: this.route })
        }
        
      },
      error: err => console.error('Erro ao remover morada', err)
    })
  }
}
