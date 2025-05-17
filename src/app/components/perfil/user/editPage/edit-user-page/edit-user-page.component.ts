import { Component, OnInit } from '@angular/core';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { ActivatedRoute , Router } from '@angular/router';
import { UpdateUserDados } from '../../../../../model/perfil/Update/UpdateUserDados';
import { UserService } from '../../../../../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-edit-user-page',
  imports: [NavBarComponent, EditUserFormComponent],
  templateUrl: './edit-user-page.component.html',
  styleUrl: './edit-user-page.component.css'
})
export class EditUserPageComponent implements OnInit {
  userId!: string 
  user!: UpdateUserDados
  constructor(private userService:UserService , private route: ActivatedRoute,private router: Router) {}
  
  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.carregarDadosUser();
  }

  carregarDadosUser() {
    this.userService.getUserEdit(this.userId).subscribe({
      next: (userDados: UpdateUserDados) => {
        this.user = userDados;
        console.log("Utilizador: ", this.user)
      }, error: (error: HttpErrorResponse) => {
        console.error("Erro a carregar o utilizador", error);
      }
    })
  }
}
