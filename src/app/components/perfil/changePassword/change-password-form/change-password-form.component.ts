import { Component, Input  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-change-password-form',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css'
})
export class ChangePasswordFormComponent {
  /** URls para os botões de action e voltar */
  @Input() action!: string;
  @Input() backUrl!: string;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
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
    if (newPassword === confirmPassword) {
      equals = true;
    }

    let error = null;
    if (!equals) {
      error = { mismatch: true }
    }

    return error;
  }
}
