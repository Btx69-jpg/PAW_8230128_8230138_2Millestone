import { ApplicationRef, ComponentRef, createComponent, Injectable, inject, EnvironmentInjector } from '@angular/core';
import { ToastComponent } from '../../../components/features/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private toasts: ComponentRef<ToastComponent>[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    // Cria o componente
    const toastRef = createComponent(ToastComponent, {
      environmentInjector: this.injector
    });

    // Define as propriedades
    toastRef.instance.message = message;
    toastRef.instance.type = type;

    // Adiciona ao DOM
    this.appRef.attachView(toastRef.hostView);
    const domElem = (toastRef.hostView as any).rootNodes[0] as HTMLElement;
    document.getElementById('toast-container')?.appendChild(domElem);

    // Auto-remove após 4 segundos
    setTimeout(() => {
      this.destroyToast(toastRef);
    }, 4000);

    this.toasts.push(toastRef);
  }

  private destroyToast(toastRef: ComponentRef<ToastComponent>) {
    this.appRef.detachView(toastRef.hostView);
    toastRef.destroy();
    this.toasts = this.toasts.filter(t => t !== toastRef);
  }
}
