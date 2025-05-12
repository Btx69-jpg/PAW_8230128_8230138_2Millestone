import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../model/perfil/user';
import { UserService } from '../../../services/user/user.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DadosUserComponent } from './dados-user/dados-user.component';

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [CommonModule, RouterModule, NavBarComponent, DadosUserComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: User = {} as User;

  constructor(public userRest: UserService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    const idTemp = this.route.snapshot.params['userId'];
    this.userRest.getUser(idTemp).subscribe({
        next: (dadosUser: User) => {
          this.user = dadosUser;
        },
        error: (err) => {
          console.error("Erro a carregar o utilizador", err);
        }
    });
  }

}
