import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../model/perfil/user';
import { UserService } from '../../../../../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-user-form',
  imports: [],
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.css'
})
export class EditUserFormComponent implements OnInit {
  @Input() user!: User
  userId!: string
  form!: FormGroup;

  constructor(userService: UserService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100), Validators.pattern("/^[a-zA-Z\s]*$/")]],
      lastName: ['', [Validators.required, Validators.maxLength(100), Validators.pattern("/^[a-zA-Z\s]*$/")]],
      phoneNumber: ['', [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      perfilPhoto: [''],
      birthdate: ['']
    });
  }
  //Mandar para o serviço o id e os daods do utilizador
  atualizarUser() {

  }

}
