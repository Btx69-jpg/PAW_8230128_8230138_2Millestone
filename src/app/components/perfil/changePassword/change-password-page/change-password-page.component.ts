import { Component } from '@angular/core';
import { ChangePasswordFormComponent } from '../change-password-form/change-password-form.component';

@Component({
  selector: 'app-change-password-page',
  imports: [ChangePasswordFormComponent],
  templateUrl: './change-password-page.component.html',
  styleUrl: './change-password-page.component.css'
})
export class ChangePasswordPageComponent {
  /** 
   * Depois mudar o userId, para o id do utilizador atual
   *   action = 'http://localhost:3000/api/v1/user/{userId}/changePassword';
  backUrl = '/perfil/user/{userId}';
   */
  action = 'http://localhost:3000/api/v1/user/{userId}/changePassword';
  backUrl = '/perfil/user';
}
