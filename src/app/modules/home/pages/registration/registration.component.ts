import {Component, effect, inject, OnDestroy, signal} from '@angular/core';
import {IRequirement} from "../../../../core/models/registration/registration";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ExamsService} from "../../../../core/services/admin/exams.service";
import {IExam} from "../../../../core/models/admin/exams";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {ToastModule} from "primeng/toast";
import {ModalitiesService} from "../../../../core/services/home/modalities.service";
import {IModality} from "../../../../core/models/admin/postulation";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    BlockUiComponent,
    ToastModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  providers: [MessageService]
})
export class RegistrationComponent implements OnDestroy {
  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _examsService: ExamsService = inject(ExamsService);
  private readonly _toastService: MessageService = inject(MessageService);
  private readonly _modalitiesService: ModalitiesService = inject(ModalitiesService);
  protected exam!: IExam;

  protected modalities: IModality[] = [];
  protected selectedMode = signal(-1);
  protected requirement: IRequirement[] = [];
  protected isLoading: boolean = false;

  constructor() {
    this._getCurrentExam();
    effect(() => {
      if (this.selectedMode() !== -1) this._getFileRequired();
    });
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.isLoading = false;
    this.modalities = [];
    this.selectedMode.set(-1);
    this.requirement = [];
  }

  private _getCurrentExam(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._examsService.getCurrentExam().subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener el examen actual'
            });
            return;
          }
          this.exam = res.data;
          this._getModalities();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isLoading = false;
          if (err.status === 404) {
            this._toastService.add({
              severity: 'warn',
              summary: 'Módulo de Registro',
              detail: err.error.msg
            });
            return;
          }
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener el examen actual, error: ' + err.message
          });
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _getModalities(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._modalitiesService.getModalities(this.exam.id_examtype).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener las modalidades'
            });
            return;
          }

          this.modalities = res.data;
          this.selectedMode.set(this.selectedMode() !== -1 ? this.selectedMode() : this.modalities[0].id);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener las modalidades, error: ' + err.message
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _getFileRequired(): void {
    this.isLoading = true;
    const id = this.selectedMode();
    this._subscriptions.add(
      this._modalitiesService.getRequirementsByModality(id).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener los archivos requeridos'
            });
            return;
          }

          this.requirement = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener los archivos requeridos, error: ' + err.message
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }
}
