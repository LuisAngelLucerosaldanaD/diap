import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {RegistrationService} from "../../../../core/services/admin/registration.service";
import {MessageService} from "primeng/api";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../core/store/app.reducers";
import {setPayments} from "../../../../core/store/actions/payment.actions";
import {FormRegistrationComponent} from "../../../../core/ui/form-registration/form-registration.component";
import {ExamsService} from "../../../../core/services/admin/exams.service";
import {IExam} from "../../../../core/models/admin/exams";
import {setExam} from "../../../../core/store/actions/exam.actions";
import {IPayment, IPaymentDTO} from "../../../../core/models/registration/registration";

@Component({
  selector: 'app-validate-registration',
  standalone: true,
  imports: [
    ToastModule,
    BlockUiComponent,
    ReactiveFormsModule,
    NgIf,
    FormRegistrationComponent
  ],
  templateUrl: './validate-registration.component.html',
  styleUrl: './validate-registration.component.scss',
  providers: [MessageService]
})
export class ValidateRegistrationComponent implements OnDestroy, OnInit {
  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _registrationService: RegistrationService = inject(RegistrationService);
  private readonly _toastService: MessageService = inject(MessageService);
  private readonly _store: Store<AppState> = inject(Store);
  private readonly _examsService: ExamsService = inject(ExamsService);
  private _exam!: IExam;

  protected isLoading: boolean = false;
  protected dniForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]);
  protected isPaymentValid: boolean = false;

  ngOnInit() {
    this._getCurrentExam();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.dniForm.reset();
    this.isLoading = false;
  }

  private _validatePayment(): void {
    this.isLoading = true;
    const data: IPaymentDTO = {
      dni: this.dniForm.value,
      type_school: null,
      id_modality: null
    }
    this._subscriptions.add(
      this._registrationService.validatePayment(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({severity: 'error', summary: 'Error', detail: res.msg});
            return;
          }

          if (!res.data) {
            this._toastService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se encontraron pagos realizados para el DNI ingresado'
            });
            return;
          }

          this._store.dispatch(setPayments({payments: res.data as IPayment[]}));
          this.isPaymentValid = true;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.error(err);
          this._toastService.add({severity: 'error', summary: 'Error', detail: err.message});
        },
        complete: () => this.isLoading = false
      })
    );
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
          this._exam = res.data;
          this._store.dispatch(setExam({exam: this._exam}));
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener el examen actual, error: ' + err.message
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  protected validate(): void {
    if (this.dniForm.invalid) {
      this._toastService.add({severity: 'error', summary: 'Error', detail: 'Ingrese un DNI válido'});
      this.dniForm.markAllAsTouched();
      return;
    }

    this._validatePayment();
  }
}
