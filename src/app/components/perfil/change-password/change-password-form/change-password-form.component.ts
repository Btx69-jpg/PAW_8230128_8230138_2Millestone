import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Password } from '../../../../model/perfil/password';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-change-password-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css'
})
export class ChangePasswordFormComponent implements OnInit{
  @Input() userId!: string;
  form!: FormGroup;

  constructor(private userService:UserService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.form = this.fb.group({
      atualPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword:   ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.matchPasswords });
  }

  /**
   * * Metodo que valida se as duas passwords são iguais
   */
  private matchPasswords(group: FormGroup) {
    const newPassword = group.get('newPassword')!.value;
    const confirmPassword = group.get('confirmNewPassword')!.value;
    let equals: boolean = false;

    if(!newPassword || !confirmPassword) {
      equals = true;
    }
    if (newPassword === confirmPassword) {
      equals = true;
    }

    let error = null;
    if (!equals) {
      error = { mismatch: true }
    }

    return error;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(): void {
    const formData = this.form.value;
    const atualPassword = formData.atualPassword;
    const novaPassword = formData.newPassword;
    const confirmPassword = formData.confirmNewPassword;

    const newPassword = new Password(atualPassword, novaPassword, confirmPassword);
    this.updatePassword(newPassword);
  }

  private updatePassword(newPassword: Password): void {
    this.userService.putPasswordUser(this.userId, newPassword).subscribe({
      next: () => {
        console.log("Password atualizada com sucesso!");
        this.goBack();
      }, error: (error) => {
        console.log("Erro a atualizar a password", error);
      }
    })
  }
}
