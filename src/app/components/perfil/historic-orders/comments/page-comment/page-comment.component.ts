import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from '../../../user/nav-bar/nav-bar.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';
import { stat } from 'fs';

@Component({
  standalone: true,
  selector: 'app-page-comment',
  imports: [NavBarComponent,AddCommentComponent, EditCommentComponent, CommonModule],
  templateUrl: './page-comment.component.html',
  styleUrl: './page-comment.component.css'
})
export class PageCommentComponent {
  userId!: string;
  orderId!: string;
  restName!: string;
  orderDate!: Date;
  comment!: String;
  isEditMode: boolean = false;
  existingComment: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    const state = window.history.state;
    this.orderId = state.orderId;
    this.restName = state.restName;
    this.orderDate = state.orderDate;
    this.comment = state.comment;
    this.existingComment = state.existingComment ?? '';

    if(this.existingComment !== '') {
      this.isEditMode = true;
    }
  }
}
