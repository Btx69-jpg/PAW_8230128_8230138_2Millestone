import { Component, OnInit } from '@angular/core';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-edit-user-page',
  imports: [NavBarComponent, EditUserFormComponent],
  templateUrl: './edit-user-page.component.html',
  styleUrl: './edit-user-page.component.css'
})
export class EditUserPageComponent implements OnInit {
  userId!: string 

  constructor(private route: ActivatedRoute,private router: Router) {}
  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
  }
}
