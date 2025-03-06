import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FileHelper} from "../../../../core/utils/file/file";
import {ConfirmationService, MessageService, PrimeTemplate} from "primeng/api";
import {Subscription} from "rxjs";
import {SettingsService} from "../../../../core/services/admin/settings.service";
import {ButtonDirective} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-settings-portal',
  standalone: true,
  imports: [
    ButtonDirective,
    ConfirmDialogModule,
    PrimeTemplate,
    BlockUiComponent,
    ToastModule
  ],
  templateUrl: './settings-portal.component.html',
  styleUrl: './settings-portal.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class SettingsPortalComponent implements OnDestroy, OnInit {

  private _subscriptions: Subscription = new Subscription();
  private readonly _toastService = inject(MessageService);
  private readonly _confirmService = inject(ConfirmationService);
  private readonly _settingsService = inject(SettingsService);

  protected logoHome = signal('');
  protected logoLogin = signal('');
  protected loading = signal(false);

  ngOnInit() {
    this._loadLoginImage('login');
    this._loadLoginImage('banner');
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.loading.set(false);
    this.logoLogin.set('');
    this.logoHome.set('');
  }

  private _saveImage(type: string): void {
    this.loading.set(true);
    const mimeType = FileHelper.GetBase64MimeType(type === 'Banner' ? this.logoHome() : this.logoLogin());
    const imgName = type === 'Banner' ? 'logo-home.png' : 'logo-login.png';
    const file = type === 'Banner' ? this.logoHome() : this.logoLogin();
    const form = new FormData();
    form.append('image', FileHelper.Base64ToImage(file.split(',')[1], imgName, mimeType));
    this._subscriptions.add(
      this._settingsService.saveImage(form, type).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de configuración',
              detail: res.msg
            });
            return;
          }
        },
        error: (err) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de configuración',
            detail: 'No se pudo guardar la imagen, intente nuevamente'
          });
        },
        complete: () => this.loading.set(false)
      })
    );
  }

  private _confirmSaveImage(type: string): void {
    this._confirmService.confirm({
      key: 'settings',
      header: 'Módulo de configuración',
      message: '¿Está seguro de guardar la imagen?',
      accept: () => this._saveImage(type),
      reject: () => {
        if (type === 'Banner') return this.logoHome.set('');
        return this.logoLogin.set('');
      }
    });
  }

  private _loadLoginImage(type: string): void {
    this.loading.set(true);
    this._subscriptions.add(
      this._settingsService.getImage(type).subscribe({
        next: (res) => {
          if (type === 'login') this.logoLogin.set(URL.createObjectURL(res));
          else this.logoHome.set(URL.createObjectURL(res));
        },
        error: (err) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de configuración',
            detail: 'No se pudo cargar la imagen, intente nuevamente'
          });
          this.loading.set(false);
        },
        complete: () => this.loading.set(false)
      })
    );
  }

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
          if (type === 'Banner') this.logoHome.set(res);
          else this.logoLogin.set(res);

          this._confirmSaveImage(type);
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
