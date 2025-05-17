import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../../../../../services/user/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateUserDados } from '../../../../../model/perfil/Update/UpdateUserDados';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UpdatePerfil } from '../../../../../model/perfil/Update/UpdatePerfilDados';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit, OnChanges {
  @Input() user!: UpdateUserDados;
  @Input() userId!: string;

  form!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inicializarVazioBuildForm(); // Inicializa logo com estrutura base
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.preencherFormularioComDados();
    }
  }

  private inicializarVazioBuildForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z\\s]*$')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z\\s]*$')]],
      birthdate: [''],
      perfil: this.fb.group({
        phoneNumber: ['', [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        perfilPhoto: ['']
      })
    });
  }

  private preencherFormularioComDados(): void {
    this.form.setValue({
      firstName: this.user.firstName || '',
      lastName: this.user.lastName || '',
      birthdate: this.user.birthdate || '',
      perfil: {
        phoneNumber: this.user.perfil.phoneNumber || '',
        email: this.user.perfil.email || '',
        perfilPhoto: this.user.perfil.perfilPhoto || ''
      }
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formData = this.form.value;
    const novoPerfil = new UpdatePerfil(
      formData.perfil.perfilPhoto,
      formData.perfil.phoneNumber,
      formData.perfil.email
    );

    const novoUser = new UpdateUserDados(
      formData.firstName,
      formData.lastName,
      novoPerfil,
      formData.birthdate
    );

    this.atualizarUser(novoUser);
  }

  private atualizarUser(novoUser: UpdateUserDados): void {
    this.userService.putUser(this.userId, novoUser).subscribe({
      next: () => {
        console.log('Utilizador atualizado com sucesso');
        this.goBack();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 302) {
          console.log('Algum dos campos está mal preenchido!', error.message);
        } else {
          console.log('Erro a carregar os dados do utilizador', error.message);
        }
      }
    });
  }
}
