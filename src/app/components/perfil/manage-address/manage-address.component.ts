import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AddressOrder } from '../../../model/order/address-order';
import { DadosAddressComponent } from './dados-address/dados-address.component';
import { NavBarComponent } from '../user/nav-bar/nav-bar.component';

@Component({
  standalone: true,
  selector: 'app-manage-address',
  imports: [NavBarComponent, DadosAddressComponent],
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent {
    addresses: AddressOrder[] = [];
    userId: string = '';
  
    constructor(private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit(): void {
      this.userId = this.route.snapshot.params['userId'];
    }
  
    addAddress() {
      this.router.navigate(['adicionar'], { relativeTo: this.route })
    }
}
