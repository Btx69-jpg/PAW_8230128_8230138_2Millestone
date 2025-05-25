import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() message: string = 'Encomenda concluída com sucesso!';
  @Input() type: 'success' | 'error' | 'info' = 'success';

  visible = true;

  ngOnInit() {
    setTimeout(() => this.visible = false, 4000); // Desaparece após 4s
  }

  close() {
    this.visible = false;
  }
}
