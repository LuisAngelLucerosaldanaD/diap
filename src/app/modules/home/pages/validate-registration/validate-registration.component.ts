import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Subscription} from "rxjs";
import {RegistrationService} from "../../../../core/services/admin/registration.service";
import {MessageService} from "primeng/api";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {NgIf} from "@angular/common";
import {FormRegistrationComponent} from "../../../../core/ui/form-registration/form-registration.component";
import {ExamsService} from "../../../../core/services/admin/exams.service";
import {IPayment, IPaymentDTO} from "../../../../core/models/registration/registration";
import { ExamStore } from '../../../../core/store/exam.store';
import { PaymentStore } from '../../../../core/store/payment.store';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-validate-registration',
  standalone: true,
    imports: [
        ToastModule,
        BlockUiComponent,
        ReactiveFormsModule,
        NgIf,
        FormRegistrationComponent,
        FormsModule,
        RouterLink
    ],
  templateUrl: './validate-registration.component.html',
  styleUrl: './validate-registration.component.scss',
  providers: [MessageService]
})
export class ValidateRegistrationComponent implements OnDestroy, OnInit {
  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _registrationService: RegistrationService = inject(RegistrationService);
  private readonly _toastService: MessageService = inject(MessageService);
  private readonly _examsService: ExamsService = inject(ExamsService);
  private readonly _examStore = inject(ExamStore);
  private readonly _paymentStore = inject(PaymentStore);

  protected isLoading: boolean = false;
  protected dniForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]);
  protected isValidPayment = signal<boolean>(false);

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

          this._paymentStore.setPayments(res.data as IPayment[]);
          this.isValidPayment.set(true);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.error(err);
          if (err.status === 404) {
            this._toastService.add({
              severity: 'warn',
              summary: 'Validación de Pago',
              detail: err.error.msg
            });
            return;
          }
          this._toastService.add({severity: 'warn', summary: 'Validación de Pago', detail: err.error.msg});
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

          this._examStore.setExam(res.data);
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

  protected validate(): void {
    if (this.dniForm.invalid) {
      this._toastService.add({severity: 'error', summary: 'Error', detail: 'Ingrese un DNI válido'});
      this.dniForm.markAllAsTouched();
      return;
    }

    this._validatePayment();
  }
}
