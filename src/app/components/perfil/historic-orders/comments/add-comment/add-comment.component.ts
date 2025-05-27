import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../../../../services/comments/comment-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent implements OnInit {
  commentForm!: FormGroup;
  @Input() orderId!: string;
  @Input() restName!: string;
  @Input() orderDate!: Date;
  selectedFile: File | null = null;  constructor(private fb: FormBuilder, private commentService: CommentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      commentPhoto: ['']
    });
  }

   onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(): void {
    if (this.commentForm.invalid) return;

    const formValue = this.commentForm.value;
    const formData = new FormData();

    formData.append('comment', formValue.comment);
    formData.append('orderId', this.orderId);
    formData.append('nameRest', this.restName);

    if (this.selectedFile) {
      formData.append('commentPhoto', this.selectedFile);
    }

    this.saveComment(formData);
  }

  private saveComment(newComment: FormData): void {
    const idUser = this.route.snapshot.paramMap.get('userId') || '';
    this.commentService.postComment(idUser, newComment).subscribe({
      next: () => {
        console.log("Comentário adicionado");
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        console.error("Error: ", error);
      }
    })
  } 
}
