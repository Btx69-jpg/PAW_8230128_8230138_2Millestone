import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../services/user/user.service';
import { User } from '../../../../model/perfil/user';

@Component({
  selector: 'app-dados-user',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './dados-user.component.html',
  styleUrls: ['./dados-user.component.css']
})
export class DadosUserComponent implements OnInit {
  @Input() user: User = {} as User;

  constructor(public userRest: UserService, private route: ActivatedRoute,private router: Router) {
  }

  ngOnInit(): void {
  }
}
