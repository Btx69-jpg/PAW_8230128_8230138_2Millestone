import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateAddressFormComponent } from './create-address-form/create-address-form.component';
import { NavBarComponent } from '../../user/nav-bar/nav-bar.component';

@Component({
  standalone: true,
  selector: 'app-create-address',
  imports: [CreateAddressFormComponent, NavBarComponent],
  templateUrl: './create-address.component.html',
  styleUrl: './create-address.component.css'
})
export class CreateAddressComponent {
  userId!: string;
  
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
  }
}
