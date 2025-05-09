import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ReactiveFormsModule }  from '@angular/forms';       // ← necessário para [formGroup]
import { RouterModule }         from '@angular/router';      // ← necessário para [routerLink]
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';

@NgModule({
  declarations: [
    ChangePasswordFormComponent,
    ChangePasswordPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule,  
  ]
})
export class ChangePasswordModule { }