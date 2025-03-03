import {Component, effect, inject, OnDestroy, signal} from '@angular/core';
import {IRequirement} from "../../../../core/models/registration/registration";
import {FormsModule} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ExamsService} from "../../../../core/services/admin/exams.service";
import {IExam} from "../../../../core/models/admin/exams";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {ToastModule} from "primeng/toast";
import {ModalitiesService} from "../../../../core/services/home/modalities.service";
import {IModality} from "../../../../core/models/admin/postulation";
import {PostStore} from "../../../../core/store/post.store";
import {ExamStore} from "../../../../core/store/exam.store";
import {ValidateRegistrationComponent} from "../validate-registration/validate-registration.component";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    BlockUiComponent,
    ToastModule,
    ValidateRegistrationComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  providers: [MessageService]
})
export class RegistrationComponent implements OnDestroy {
  // General injects
  private readonly _subscriptions: Subscription = new Subscription();

  // Services
  private readonly _examsService: ExamsService = inject(ExamsService);
  private readonly _toastService: MessageService = inject(MessageService);
  private readonly _modalitiesService: ModalitiesService = inject(ModalitiesService);

  // Store
  private readonly _postStore = inject(PostStore);
  private readonly _examStore = inject(ExamStore);

  protected selectedMode = signal(-1);
  protected isLoading = signal(false);
  protected onboarding = signal(false);
  protected exam!: IExam;
  protected requirement: IRequirement[] = [];
  protected modalities: IModality[] = [];

  constructor() {
    this._getCurrentExam();
    effect(() => {
      if (this.selectedMode() !== -1) this._getFileRequired();
    }, {allowSignalWrites: true});

    if (this._postStore.finish()) {
      this.onboarding.set(false);
    }
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.isLoading.set(false);
    this.selectedMode.set(-1);
    this.modalities = [];
    this.requirement = [];
  }

  private _getCurrentExam(): void {
    this.isLoading.set(true);
    this._subscriptions.add(
      this._examsService.getExams().subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener el examen actual'
            });
            return;
          }
          console.log(res.data);
          this.exam = res.data[0];
          this._examStore.setExam(res.data[0]);
          this._getModalities();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isLoading.set(false);
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
        complete: () => this.isLoading.set(false)
      })
    );
  }

  private _getModalities(): void {
    this.isLoading.set(true);
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
          this.isLoading.set(false);
        },
        complete: () => this.isLoading.set(false)
      })
    );
  }

  private _getFileRequired(): void {
    this.isLoading.set(true);
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
          this.isLoading.set(false);
        },
        complete: () => this.isLoading.set(false)
      })
    );
  }

  protected goToRegister(): void {
    const modality = this.modalities.find(m => m.id === this.selectedMode());
    if (!modality) return;
    this._postStore.setModality(modality);
    this.onboarding.set(true);
  }

}
