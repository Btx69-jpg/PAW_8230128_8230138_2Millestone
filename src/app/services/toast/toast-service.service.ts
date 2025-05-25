import { ApplicationRef, ComponentRef, createComponent, Injectable, Injector } from '@angular/core';
import { ToastComponent } from '../../components/features/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(private appRef: ApplicationRef, private injector: Injector) {}

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const toastRef: ComponentRef<ToastComponent> = createComponent(ToastComponent, {
      environmentInjector: this.appRef.injector
    });

    toastRef.instance.message = message;
    toastRef.instance.type = type;

    this.appRef.attachView(toastRef.hostView);
    const domElem = (toastRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    setTimeout(() => {
      this.appRef.detachView(toastRef.hostView);
      toastRef.destroy();
    }, 4500);
  }
}
