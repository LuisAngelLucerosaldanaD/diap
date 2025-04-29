import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FilterPipeModule} from "ngx-filter-pipe";
import {Menu, MenuModule} from "primeng/menu";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {Subscription} from "rxjs";
import {ModalitiesService} from "../../../../core/services/home/modalities.service";
import {IModality, IModalityDTO} from "../../../../core/models/admin/postulation";
import {HttpErrorResponse} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {IExam} from "../../../../core/models/admin/exams";
import {NameInpDirective} from "../../../../core/directives/name-inp.directive";
import {NumbersInpDirective} from "../../../../core/directives/numbers-inp.directive";
import {AppStore} from "../../../../core/store/app.store";

@Component({
  selector: 'app-modalidades',
  standalone: true,
  imports: [
    BlockUiComponent,
    ConfirmDialogModule,
    FilterPipeModule,
    MenuModule,
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    RouterLink,
    ToastModule,
    NameInpDirective,
    NumbersInpDirective
  ],
  templateUrl: './modalidades.component.html',
  styleUrl: './modalidades.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ModalidadesComponent implements OnInit, OnDestroy {

  private readonly _subscriptions: Subscription = new Subscription();

  // Services
  private readonly _modalitiesService: ModalitiesService = inject(ModalitiesService);
  private readonly _toastService: MessageService = inject(MessageService);
  private readonly _confirmService: ConfirmationService = inject(ConfirmationService);
  private readonly _router: Router = inject(Router);

  // Store
  private readonly _appStore = inject(AppStore);

  private modality = signal<IModality | null>(null);
  protected modalities = signal<IModality[]>([]);
  protected loading = signal(false);
  protected modal = signal(false);
  protected editing = signal(false);

  protected modFilter: any = {name: ''};
  protected menu = [
    {
      label: 'Acciones',
      items: [
        {
          label: 'Editar',
          icon: 'pi pi-pen-to-square',
          command: () => this.onEditModality()
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          command: () => this._onDelete()
        },
        {
          label: 'Gestionar Requisitos',
          icon: 'pi pi-file-check',
          command: () => {
            this._appStore.setModality(this.modality());
            this._router.navigate(['/admin/requisitos']);
          }
        }
      ]
    }
  ];
  protected modForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    private_code_pay: new FormControl('', Validators.required),
    private_price: new FormControl('', Validators.required),
    state_code_pay: new FormControl('', Validators.required),
    state_price: new FormControl('', Validators.required),
    exam_type: new FormControl(2),
  });


  ngOnInit() {
    this._getModalities();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.modalities.set([]);
  }

  private _getModalities() {
    this.loading.set(true);
    this._subscriptions.add(
      this._modalitiesService.getModalities(2).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Modalidades',
              detail: res.msg
            });

            return;
          }

          this.modalities.set(res.data);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.loading.set(false);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Modalidades',
            detail: 'Error al obtener las modalidades, intente nuevamente'
          });
        },
        complete: () => this.loading.set(false)
      })
    );
  }

  private _createModality(): void {
    this.loading.set(true);
    const data: IModalityDTO = {
      description: this.modForm.value.description,
      id_examtype: 2,
      name: this.modForm.value.name,
      private_school_code_pay: parseInt(this.modForm.value.private_code_pay),
      private_school_price: parseInt(this.modForm.value.private_price),
      state_school_code_pay: parseInt(this.modForm.value.state_code_pay),
      state_school_price: parseInt(this.modForm.value.state_price)
    };
    this._subscriptions.add(
      this._modalitiesService.createModality(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Modalidades',
              detail: res.msg
            });

            return;
          }

          this._toastService.add({
            severity: 'success',
            summary: 'Módulo de Modalidades',
            detail: res.msg
          });

          this._getModalities();
          this.closeMenu();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.loading.set(false);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Modalidades',
            detail: err.error.msg
          });
        },
        complete: () => this.loading.set(false)
      })
    );
  }

  private _updateModality(): void {
    this.loading.set(true);
    const data: IModalityDTO = {
      description: this.modForm.value.description,
      id_examtype: 2,
      name: this.modForm.value.name,
      private_school_code_pay: parseInt(this.modForm.value.private_code_pay),
      private_school_price: parseInt(this.modForm.value.private_price),
      state_school_code_pay: parseInt(this.modForm.value.state_code_pay),
      state_school_price: parseInt(this.modForm.value.state_price)
    };

    this._subscriptions.add(
      this._modalitiesService.updateModality(this.modForm.value.id, data).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Modalidades',
              detail: res.msg
            });

            return;
          }

          this._toastService.add({
            severity: 'success',
            summary: 'Módulo de Modalidades',
            detail: res.msg
          });

          this._getModalities();
          this.closeMenu();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.loading.set(false);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Modalidades',
            detail: err.error.msg
          });
        },
        complete: () => this.loading.set(false)
      })
    );
  }

  private _deleteModality(): void {
    this.loading.set(true);
    this._subscriptions.add(
      this._modalitiesService.deleteModality(this.modForm.value.id).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Modalidades',
              detail: res.msg
            });

            return;
          }

          this._toastService.add({
            severity: 'success',
            summary: 'Módulo de Modalidades',
            detail: res.msg
          });

          this._getModalities();
          this.closeMenu();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.loading.set(false);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Modalidades',
            detail: err.error.msg
          });
        },
        complete: () => this.loading.set(false)
      })
    );
  }

  private _onDelete(): void {
    this._confirmService.confirm({
      header: 'Eliminar Modalidad',
      key: 'modality',
      message: '¿Está seguro de eliminar la modalidad?',
      accept: () => {
        this._deleteModality();
      }
    });
  }

  protected openMenu(data: IModality, menu: Menu, event: any): void {
    this.modForm.patchValue({
      id: data.id,
      name: data.name,
      description: data.description,
      private_code_pay: data.private_school_code_pay,
      private_price: data.private_school_price,
      state_code_pay: data.state_school_code_pay,
      state_price: data.state_school_price,
      exam_type: 2
    });
    this.modality.set(data);
    menu.toggle(event);
  }

  protected onCreateModality(): void {
    this.modal.set(true);
    this.editing.set(false);
    this.modForm.reset();
  }

  protected onEditModality(): void {
    this.editing.set(true);
    this.modal.set(true);
  }

  protected closeMenu(): void {
    this.editing.set(false);
    this.modal.set(false);
    this.modForm.reset();
  }

  protected onSave(): void {
    if (this.modForm.invalid) {
      console.log(this.modForm);
      this._toastService.add({
        severity: 'warn',
        summary: 'Módulo de Modalidades',
        detail: 'Complete los campos requeridos'
      });
      this.modForm.markAsUntouched();
      return;
    }

    if (this.editing()) return this._updateModality();

    return this._createModality();
  }

}
