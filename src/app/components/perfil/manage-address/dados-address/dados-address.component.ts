import { Component, Input, OnInit } from '@angular/core';
import { AddressOrder } from '../../../../model/order/address-order';
import { CommonModule } from '@angular/common';
import { AddresOrderService } from '../../../../services/address/addres-order.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({

  selector: 'app-dados-address',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './dados-address.component.html',
  styleUrls: ['./dados-address.component.css']
})
export class DadosAddressComponent implements OnInit{
  userId: string = '';
  addresses: AddressOrder[] = [];

  constructor(public addressOrderRest: AddresOrderService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.carregarOrders();
  }

  carregarOrders() {
    this.addressOrderRest.getAddressesOrder(this.userId).subscribe({
        next: (addresses: AddressOrder[]) => {
          this.addresses = addresses;
          console.log("Moradas", addresses);
        },
        error: (err) => {
          console.error("Erro a carregar o utilizador", err);
        }
    });
  }

  deleteAddress(addressId: string) {
    console.log(addressId);
    this.addressOrderRest.deleteAddressOrder(this.userId, addressId).subscribe({
        next: deleted => {
          this.addresses = this.addresses.filter(a => a._id !== addressId);
        },
        error: err => console.error('Erro ao remover morada', err)
      });
  }

  editAddress(addressId: string) {
    console.log('Edit clicked with ID:', addressId);
    this.router.navigate(['edit', addressId], { relativeTo: this.route });
  }
}
