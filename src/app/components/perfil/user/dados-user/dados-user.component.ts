import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../services/user/user.service';
import { User } from '../../../../model/perfil/user';
import { environment } from '../../../../enviroments/enviroment';

@Component({
  selector: 'app-dados-user',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './dados-user.component.html',
  styleUrls: ['./dados-user.component.css']
})
export class DadosUserComponent implements OnInit {
  @Input() user: User = {} as User;

  constructor(public userRest: UserService, private route: ActivatedRoute, private router: Router) {
  }

  get fullImagePath(): string {
    return this.user?.perfil?.perfilPhoto
      ? `${environment.apiUrl}${this.user.perfil.perfilPhoto}`
      : '/assets/img/no-image.png';
  }

  ngOnInit(): void {
    console.log("Foto do utilizador:", this.user?.perfil?.perfilPhoto);
  }
  
}
