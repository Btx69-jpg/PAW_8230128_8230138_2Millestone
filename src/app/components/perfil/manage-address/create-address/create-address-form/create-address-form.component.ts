import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../../../../model/address';
import { HttpResponse } from '@angular/common/http';
import { AddresOrderService } from '../../../../../services/address/addres-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { newAddressOrder } from '../../../../../model/order/newAddressOrder';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-create-address-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-address-form.component.html',
  styleUrls: ['./create-address-form.component.css']
})
export class CreateAddressFormComponent implements OnInit {
  @Input() userId!: string;

  addressData = {
    nif: '',
    street: '',
    postal_code: '',
    city: ''
  };

  constructor(
    private addressService: AddresOrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  saveAddress(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { nif, street, postal_code, city } = this.addressData;

 

    const address = new Address(street, postal_code, city);
    let addressOrder;

    if(nif) {
      const parsedNif = Number(nif);
      addressOrder = new newAddressOrder(address, parsedNif);
    } else {
      addressOrder = new newAddressOrder(address);
    }

    this.addressService.postAddressOrder(this.userId, addressOrder).subscribe({
      next: (response: HttpResponse<newAddressOrder>) => {
        if (response.status === 200) {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      },
      error: err => console.error('Erro ao adicionar a morada', err)
    });
  }

}
