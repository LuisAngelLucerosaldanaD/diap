import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Menu, MenuModule} from "primeng/menu";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {Router, RouterLink} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {ModalitiesService} from "../../../../core/services/home/modalities.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {ToastModule} from "primeng/toast";
import {FilterPipeModule} from "ngx-filter-pipe";
import {ButtonDirective} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {IRequirement, IRequirementDTO} from "../../../../core/models/admin/modality";
import {AppStore} from "../../../../core/store/app.store";

@Component({
  selector: 'app-requisitos',
  standalone: true,
  imports: [
    FormsModule,
    MenuModule,
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    RouterLink,
    BlockUiComponent,
    ToastModule,
    FilterPipeModule,
    ButtonDirective,
    ConfirmDialogModule
  ],
  templateUrl: './requisitos.component.html',
  styleUrl: './requisitos.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class RequisitosComponent implements OnDestroy, OnInit {
  // General injects
  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _router: Router = inject(Router);

  // Services
  private readonly _toastService: MessageService = inject(MessageService);
  private readonly _modalitiesService: ModalitiesService = inject(ModalitiesService);
  private readonly _confirmService: ConfirmationService = inject(ConfirmationService);

  // Store
  protected readonly _appStore = inject(AppStore);

  protected requirements = signal<IRequirement[]>([]);
  protected loading = signal(false);
  protected modal = signal(false);
  protected editing = signal(false);

  protected reqFilter: any = {name: ''};
  protected menu = [
    {
      label: 'Acciones',
      items: [
        {
          label: 'Editar',
          icon: 'pi pi-pen-to-square',
          command: () => this._onEdit()
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          command: () => this._onDelete()
        },
      ]
    }
  ];

  protected reqForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description_guide: new FormControl('', [Validators.required]),
    url_guide: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    if (!this._appStore.modality()) {
      this._router.navigateByUrl('/admin/modalidades');
      return;
    }
    this._getRequirements();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.requirements.set([]);
    this.modal.set(false);
    this.editing.set(false);
    this.loading.set(false);
  }

  private _getRequirements(): void {
    this.loading.set(true);
    const id: any = this._appStore.modality()?.id;
    this._subscriptions.add(
      this._modalitiesService.getRequirementsByModality(id).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Requisitos',
              detail: 'No se pudo obtener los archivos requeridos'
            });
            return;
          }

          this.requirements.set(res.data);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.loading.set(false);
          if (err.status === 404) {
            this._toastService.add({
              severity: 'info',
              summary: 'Módulo de Requisitos',
              detail: err.error.msg
            });
            return;
          }
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Requisitos',
            detail: 'No se pudo obtener los archivos requeridos, error: ' + err.message
          });
        },
        complete: () => this.loading.set(false)
      })
    );
  }

  private _createRequirement(): void {
    this.loading.set(true);
    const data: IRequirementDTO = {
      name: this.reqForm.value.name,
      description_guide: this.reqForm.value.description_guide,
      url_guide: this.reqForm.value.url_guide,
      url_template: '',
      id_modality: this._appStore.modality()?.id as number
    };
    this._subscriptions.add(
      this._modalitiesService.createRequirement(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Requisitos',
              detail: 'No se pudo crear el archivo requerido'
            });
            return;
          }

          this._getRequirements();
          this.modal.set(false);
          this.reqForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Requisitos',
            detail: 'No se pudo crear el requerimiento, error: ' + err.message
          });
          this.loading.set(false);
        },
        complete: () => this.loading.set(false)
      })
    );
  }

  private _deleteRequirement(): void {
    this.loading.set(true);
    const id = this.reqForm.value.id;
    this._subscriptions.add(
      this._modalitiesService.deleteRequirement(id).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Requisitos',
              detail: 'No se pudo eliminar el archivo requerido'
            });
            return;
          }

          this.requirements.update(req => req.filter(r => r.id !== id));
          this._getRequirements();
          this.reqForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Requisitos',
            detail: 'No se pudo eliminar el requerimiento, error: ' + err.message
          });
          this.loading.set(false);
        },
        complete: () => this.loading.set(false)
      })
    );
  }

  private _updateRequirement(): void {
    this.loading.set(true);
    const id = this.reqForm.value.id;
    const data: IRequirementDTO = {
      name: this.reqForm.value.name,
      description_guide: this.reqForm.value.description_guide,
      url_guide: this.reqForm.value.url_guide,
      url_template: '',
      id_modality: this._appStore.modality()?.id as number
    };
    this._subscriptions.add(
      this._modalitiesService.updateRequirement(id, data).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Requisitos',
              detail: 'No se pudo actualizar el archivo requerido'
            });
            return;
          }

          this._getRequirements();
          this.modal.set(false);
          this.reqForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Requisitos',
            detail: 'No se pudo actualizar el requerimiento, error: ' + err.message
          });
          this.loading.set(false);
        },
        complete: () => this.loading.set(false)
      })
    );
  }

  private _onDelete(): void {
    this._confirmService.confirm({
      header: 'Eliminar Requisito',
      key: 'requirements',
      message: '¿Está seguro de eliminar el requisito?',
      accept: () => {
        this._deleteRequirement();
      }
    });
  }

  private _onEdit(): void {
    this.editing.set(true);
    this.modal.set(true);
  }

  protected onCreate(): void {
    this.modal.set(true);
    this.editing.set(false);
    this.reqForm.reset();
  }

  protected openMenu(data: IRequirement, menu: Menu, event: any): void {
    this.reqForm.patchValue({
      id: data.id,
      name: data.name,
      description_guide: data.description_guide,
      url_guide: data.url_guide,
    });
    menu.toggle(event);
  }

  protected onSave(): void {
    if (this.reqForm.invalid) {
      this._toastService.add({
        severity: 'error',
        summary: 'Módulo de Requisitos',
        detail: 'Todos los campos son requeridos'
      });
      this.reqForm.markAsUntouched();
      return;
    }

    if (this.editing()) return this._updateRequirement();

    return this._createRequirement();
  }

  protected cancel(): void {
    this.modal.set(false);
    this.reqForm.reset();
    this.editing.set(false);
  }

}
