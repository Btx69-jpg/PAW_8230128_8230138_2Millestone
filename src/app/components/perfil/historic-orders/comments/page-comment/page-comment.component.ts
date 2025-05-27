import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from '../../../user/nav-bar/nav-bar.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';

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
  isEditMode: boolean = false;
  existingComment: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    const state = window.history.state;
    this.orderId = state.orderId;
    this.restName = state.restName;
    this.orderDate = state.orderDate;
    this.existingComment = state.existingComment ?? '';
  }
}
