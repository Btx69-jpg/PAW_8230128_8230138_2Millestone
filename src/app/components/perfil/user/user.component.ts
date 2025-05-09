import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DadosUserComponent } from './dados-user/dados-user.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavBarComponent, DadosUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {

}
