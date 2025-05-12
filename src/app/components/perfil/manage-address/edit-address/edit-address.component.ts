import { Component, Input } from '@angular/core';
import { NavBarComponent } from '../../user/nav-bar/nav-bar.component';
import { EditAddressFormComponent } from './edit-address-form/edit-address-form.component';
import { AddressOrder } from '../../../../model/order/address-order';
import { AddresOrderService } from '../../../../services/address/addres-order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-edit-address-page',
  imports: [NavBarComponent, EditAddressFormComponent],
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.css'
})
export class EditAddressPageComponent {
  addressOrder: AddressOrder = {} as AddressOrder;
  userId!: string;
  addressId!: string;

  constructor(private route: ActivatedRoute, private router: Router, private addressService: AddresOrderService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.addressId = this.route.snapshot.params['addressId'];

    this.loadAddressData();
  }

  loadAddressData() {
    this.addressService.getAddressOrder(this.userId, this.addressId).subscribe({
      next: (addressData: AddressOrder) => {
        this.addressOrder = addressData;
      },
      error: (err) => {
        console.error("Erro a carregar a morada do utilizador", err);
      }
    })
  }
}
