import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../../../../services/comments/comment-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-comment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.css'
})
export class EditCommentComponent {
  commentForm!: FormGroup;
  @Input() orderId!: string;
  @Input() restName!: string;
  @Input() orderDate!: Date;
  @Input() comment!: String;

  selectedFile: File | null = null;  
  
  constructor(private fb: FormBuilder, private commentService: CommentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.commentForm = this.fb.group({
      comment: [this.comment || '', Validators.required],
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

    this.updateComment(formData);
  }

  private updateComment(newComment: FormData): void {   
    const idUser = this.route.snapshot.paramMap.get('userId') || '';
    this.commentService.putComment(idUser, newComment).subscribe({
      next: () => {
        console.log("Comentário editado");
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        console.error("Error: ", error);
      }
    })
    
  } 
}
