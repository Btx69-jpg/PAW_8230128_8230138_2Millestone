import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-comment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.css'
})
export class EditCommentComponent {
  @Input() orderId!: string;
  @Input() restName!: string;
  @Input() orderDate!: Date;
  @Input() existingComment!: string;
}
