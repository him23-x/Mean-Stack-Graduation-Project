import { Component, Injectable, signal } from '@angular/core';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast = signal<ToastMessage | null>(null);

  show(text: string, type: 'success' | 'error' | 'info' = 'success') {
    this.toast.set({ text, type });
    setTimeout(() => this.clear(), 3500);
  }

  clear() {
    this.toast.set(null);
  }
}

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    @if (toastService.toast(); as t) {
      <div class="toast-container" [class]="t.type">
        <span class="icon">
          @if (t.type === 'success') { ✅ }
          @else if (t.type === 'error') { ⚠️ }
          @else { ℹ️ }
        </span>
        <span class="message">{{ t.text }}</span>
        <button class="close-btn" (click)="toastService.clear()">✕</button>
      </div>
    }
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 20px;
      border-radius: 12px;
      background-color: #1e293b;
      color: #ffffff;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
      border: 1px solid #334155;
      z-index: 1000;
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .toast-container.success { border-left: 5px solid #10b981; }
    .toast-container.error { border-left: 5px solid #ef4444; }
    .toast-container.info { border-left: 5px solid #3b82f6; }
    .message { font-size: 0.95rem; font-weight: 500; }
    .close-btn { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 1rem; }
    .close-btn:hover { color: #fff; }
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}