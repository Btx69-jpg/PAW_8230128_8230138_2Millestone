import { Component, Input, OnInit } from '@angular/core';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ChangePasswordFormComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  userId!: string;

  constructor(private route: ActivatedRoute,private router: Router) {}
  
  ngOnInit(): void {
      this.userId = this.route.snapshot.params['userId'];
  }
}
