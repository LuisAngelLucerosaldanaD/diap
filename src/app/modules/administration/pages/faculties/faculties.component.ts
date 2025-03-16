import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {IFaculties} from "../../../../core/models/faculties/faculties";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NameInpDirective} from "../../../../core/directives/name-inp.directive";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {FacultiesService} from "../../../../core/services/admin/faculties.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {FileHelper} from "../../../../core/utils/file/file";

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    NameInpDirective,
    ToastModule,
    BlockUiComponent
  ],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.scss',
  providers: [MessageService]
})
export class FacultiesComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription = new Subscription();
  private readonly _toastService = inject(MessageService);
  private readonly _facultiesService = inject(FacultiesService);

  private logoName = signal('');

  protected faculties = signal<IFaculties[]>([]);
  protected openModal = signal(false);
  protected isLoading = signal(false);
  protected isEditing = signal(false);
  protected schoolForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    logo: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    page_link: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.pattern('^(http|https)://.*$')]),
    professional_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    academic_degree: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
  });


  ngOnInit() {
    this._getFaculties();
  }

  ngOnDestroy() {
  }

  private _getFaculties(): void {
    this.isLoading.set(true);
    this._subscriptions.add(
      this._facultiesService.getFaculties().subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Modulo de Facultades',
              detail: res.msg
            });
            return;
          }
          this.faculties.set(res.data);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Facultades',
            detail: 'Error al obtener las facultades, intente nuevamente'
          });
          this.isLoading.set(false);
        },
        complete: () => this.isLoading.set(false)
      })
    );
  }

  private _deleteFaculty(id: number): void {
    this.isLoading.set(true);
    this._subscriptions.add(
      this._facultiesService.deleteFaculty(id).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Modulo de Facultades',
              detail: res.msg
            });
            return;
          }
          this._toastService.add({
            severity: 'success',
            summary: 'Facultades',
            detail: 'Facultad eliminada correctamente'
          });
          this._getFaculties();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Facultades',
            detail: 'Error al eliminar la facultad, intente nuevamente'
          });
          this.isLoading.set(false);
        },
        complete: () => this.isLoading.set(false)
      })
    );
  }

  private _createFaculty(): void {
    this.isLoading.set(true);
    const form = new FormData();
    const logo = this.schoolForm.get('logo')?.value;
    const file = logo.split(',');
    form.set('name', this.schoolForm.value.name);
    form.set('photo_path', FileHelper.Base64ToFile(file[1], this.logoName().replaceAll('', '_'), FileHelper.GetBase64MimeType(logo)));
    form.set('url_web_address', this.schoolForm.value.page_link);
    form.set('professional_title', this.schoolForm.value.professional_name);
    form.set('academic_degree', this.schoolForm.value.academic_degree);

    this._subscriptions.add(
      this._facultiesService.createFaculty(form).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Modulo de Facultades',
              detail: res.msg
            });
            return;
          }
          this._toastService.add({
            severity: 'success',
            summary: 'Facultades',
            detail: 'Facultad creada correctamente'
          });
          this._getFaculties();
          this.cancel();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Facultades',
            detail: 'Error al crear la facultad, intente nuevamente'
          });
          this.isLoading.set(false);
        },
        complete: () => this.isLoading.set(false)
      })
    );
  }

  private _updateFaculty(): void {
    const form = new FormData();
    const logo: string = this.schoolForm.get('logo')?.value;
    if (logo.startsWith('data:')) {
      const file = this.schoolForm.get('logo')?.value.split(',');
      form.set('photo_path', FileHelper.Base64ToFile(file[1], this.logoName().replaceAll('', '_'), FileHelper.GetBase64MimeType(logo)));
    } else {
      form.set('photo_path', '');
    }

    form.set('name', this.schoolForm.value.name);
    form.set('url_web_address', this.schoolForm.value.page_link);
    form.set('professional_title', this.schoolForm.value.professional_name);
    form.set('academic_degree', this.schoolForm.value.academic_degree);

    this.isLoading.set(true);
    this._subscriptions.add(
      this._facultiesService.updateFaculty(form, this.schoolForm.get('id')?.value).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Modulo de Facultades',
              detail: res.msg
            });
            return;
          }
          this._toastService.add({
            severity: 'success',
            summary: 'Facultades',
            detail: 'Facultad actualizada correctamente'
          });
          this._getFaculties();
          this.cancel();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Facultades',
            detail: 'Error al actualizar la facultad, intente nuevamente'
          });
          this.isLoading.set(false);
        },
        complete: () => this.isLoading.set(false)
      })
    );
  }

  protected saveSchool(): void {
    if (this.schoolForm.invalid) {
      this._toastService.add({
        severity: 'error',
        summary: 'Formulario de Escuelas',
        detail: 'Complete todos los campos requeridos'
      });
      this.schoolForm.markAllAsTouched();
      return;
    }

    if (this.isEditing()) return this._updateFaculty();

    return this._createFaculty();
  }

  protected cancel(): void {
    this.openModal.set(false);
    this.logoName.set('');
    this.schoolForm.reset();
  }

  protected editFaculty(faculty: IFaculties): void {
    this.isEditing.set(true);
    this.openModal.set(true);
    this.schoolForm.patchValue({
      id: faculty.id,
      name: faculty.name,
      page_link: faculty.url_web_address,
      professional_name: faculty.professional_title,
      academic_degree: faculty.academic_degree,
      logo: faculty.photo_url
    });
  }

  protected processLogo(ev: any): void {
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
          console.log(file.name)
          this.logoName.set(file.name);
          this.schoolForm.get('logo')?.setValue(res);
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

  protected createFaculty(): void {
    this.isEditing.set(false);
    this.openModal.set(true);
    this.schoolForm.reset();
  }

}
