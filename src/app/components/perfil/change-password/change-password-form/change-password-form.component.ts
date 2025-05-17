import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css'
})
export class ChangePasswordFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
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

  goBack(): void {
    console.log("Voltar")
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
