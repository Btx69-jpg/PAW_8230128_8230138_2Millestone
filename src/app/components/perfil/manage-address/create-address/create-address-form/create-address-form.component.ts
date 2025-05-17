import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../../../../model/address';
import { AddressOrder } from '../../../../../model/order/address-order';
import { HttpResponse } from '@angular/common/http';
import { AddresOrderService } from '../../../../../services/address/addres-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { newAddressOrder } from '../../../../../model/order/newAddressOrder';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-address-form',
  imports: [FormsModule],
  templateUrl: './create-address-form.component.html',
  styleUrl: './create-address-form.component.css'
})
export class CreateAddressFormComponent implements OnInit {
  @Input() userId!: string;
  addressData = {
    nif: '',
    street: '',
    postal_code: '',
    city: ''
  };

  constructor(private addressService: AddresOrderService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
  }

  getRoute() {
    return this.route;
  }

  getRouter() {
    return this.router;
  }

  saveAddress(form: NgForm) {
    console.log("Utilizador: ", this.userId);
    const nif = form.value.nif;
    const street = form.value.street;
    const postal_code = form.value.postal_code;
    const city  = form.value.city;
    const address = new Address(street, postal_code, city);
    const addressOrder = new newAddressOrder(address, nif);

    console.log("Morada: ", addressOrder);
    this.addressService.postAddressOrder(this.userId, addressOrder).subscribe({
      next: (response: HttpResponse<newAddressOrder>) => {

        const status = response.status;
        if (status=== 200) {
          this.router.navigate(['../'], { relativeTo: this.route })
        }
        
      },
      error: err => console.error('Erro ao adicionar a morada', err)
    })
  }
}
