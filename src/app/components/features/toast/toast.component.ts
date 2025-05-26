import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-toast',
  template: `
    <div class="toast {{type}}">
      <span>{{ message }}</span>
      <button (click)="close()" class="toast-close">&times;</button>
    </div>
  `,
  styles: [`
    .toast {
      position: relative;
      padding: 12px 16px;
      min-width: 200px;
      border-radius: 4px;
      color: white;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .success { background: #22c55e; }
    .error { background: #ef4444; }
    .info { background: #3b82f6; }

    .toast-close {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
      margin-left: 10px;
    }
  `]
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'success';

  close() {
    const element = document.querySelector('.toast');
    element?.remove();
  }
}
