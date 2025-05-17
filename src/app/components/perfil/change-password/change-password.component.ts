import { Component, Input } from '@angular/core';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';

@Component({
  selector: 'app-change-password',
  imports: [ChangePasswordFormComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  @Input() userId!: string;

}
