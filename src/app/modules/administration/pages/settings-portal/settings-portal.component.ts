import {Component, inject, signal} from '@angular/core';
import {FileHelper} from "../../../../core/utils/file/file";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-settings-portal',
  standalone: true,
  imports: [],
  templateUrl: './settings-portal.component.html',
  styleUrl: './settings-portal.component.scss',
  providers: [MessageService]
})
export class SettingsPortalComponent {

  private _subscriptions: Subscription = new Subscription();
  private readonly _toastService = inject(MessageService);

  protected logoHome = signal('');
  protected logoLogin = signal('');

  protected processLogo(ev: any, type: string): void {
    const file: File = ev.target.files[0];
    if (!file) return;
    if (file.type.split('/')[0] !== 'image') {
      this._toastService.add({
        severity: 'error',
        summary: 'Módulo de Registro',
        detail: 'Solo se permiten imágenes'
      });
      return;
    }
    this._subscriptions.add(
      FileHelper.fileReader(file).subscribe({
        next: res => {
          if (type === 'home') this.logoHome.set(res);
          else this.logoLogin.set(res);
        },
        error: (err) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo procesar la imagen'
          });
        }
      })
    );
  }
}
