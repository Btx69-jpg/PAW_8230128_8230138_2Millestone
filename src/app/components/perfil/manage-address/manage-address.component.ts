import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AddressOrder } from '../../../model/order/address-order';
import { NavBarComponent } from '../user/nav-bar/nav-bar.component';
import { DadosAddressComponent } from './dados-address/dados-address.component';

@Component({
  standalone: true,
  selector: 'app-manage-address',
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NavBarComponent,
    DadosAddressComponent
  ],
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent implements OnInit {
  addresses: AddressOrder[] = [];
  userId: string = '';

  constructor(public route: ActivatedRoute  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
  }
}
