import {Component, effect, inject, OnDestroy, signal} from '@angular/core';
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
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha";
import {DatePipe} from "@angular/common";
import {IRequirement} from "../../../../core/models/admin/modality";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    BlockUiComponent,
    ToastModule,
    ValidateRegistrationComponent,
    RecaptchaFormsModule,
    RecaptchaModule,
    DatePipe
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
  protected readonly _postStore = inject(PostStore);
  protected readonly _examStore = inject(ExamStore);

  protected selectedMode = signal(-1);
  protected isLoading = signal(false);
  protected exams = signal<IExam[]>([]);
  protected exam!: IExam;
  protected requirement: IRequirement[] = [];
  protected modalities: IModality[] = [];

  constructor() {
    this._examStore.setExam(null);
    this._getExams();
    effect(() => {
      if (this.selectedMode() !== -1) this._getFileRequired();
    }, {allowSignalWrites: true});
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.isLoading.set(false);
    this.selectedMode.set(-1);
    this._postStore.setPostulation({
      dni: '',
      modality: null,
      onboarding: false,
      typeSchool: ''
    });
    this._examStore.setExam(null);
    this.modalities = [];
    this.requirement = [];
    this.exams.set([]);
  }

  private _getExams(): void {
    this.isLoading.set(true);
    this._subscriptions.add(
      this._examsService.getCurrentExams().subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener el examen actual'
            });
            return;
          }
          this.exams.set(res.data);
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
    const modality = this.modalities.find(m => m.id.toString() === this.selectedMode().toString());
    if (!modality) return;
    this._postStore.setModality(modality);
    this._postStore.setOnboarding(true);
  }

  protected setExam(exam: IExam): void {
    this.exam = exam;
    this._examStore.setExam(exam);
    this._getModalities();
  }

  protected closeRegister(): void {
    this._examStore.setExam(null);
    this.exam = {} as IExam;
    this.modalities = [];
    this.selectedMode.set(-1);
    this.requirement = [];
  }

}
