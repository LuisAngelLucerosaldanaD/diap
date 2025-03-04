import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Subscription} from "rxjs";
import {RegistrationService} from "../../../../core/services/admin/registration.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {NgIf} from "@angular/common";
import {FormRegistrationComponent} from "../../../../core/ui/form-registration/form-registration.component";
import {IPayment, IPaymentDTO} from "../../../../core/models/registration/registration";
import {PaymentStore} from '../../../../core/store/payment.store';
import {NumbersInpDirective} from "../../../../core/directives/numbers-inp.directive";
import {PostStore} from "../../../../core/store/post.store";
import {ExamStore} from "../../../../core/store/exam.store";

@Component({
  selector: 'app-validate-registration',
  standalone: true,
  imports: [
    ToastModule,
    BlockUiComponent,
    ReactiveFormsModule,
    NgIf,
    FormRegistrationComponent,
    NumbersInpDirective,
  ],
  templateUrl: './validate-registration.component.html',
  styleUrl: './validate-registration.component.scss',
  providers: [MessageService]
})
export class ValidateRegistrationComponent implements OnDestroy, OnInit {
  private readonly _subscriptions: Subscription = new Subscription();

  // Services
  private readonly _registrationService: RegistrationService = inject(RegistrationService);
  private readonly _toastService: MessageService = inject(MessageService);

  // Store
  private readonly _paymentStore = inject(PaymentStore);
  private readonly _postStore = inject(PostStore);
  private readonly _examStore = inject(ExamStore);

  protected isLoading = signal(false);
  protected isValidPayment = signal(false);
  protected postForm: FormGroup = new FormGroup({
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    school: new FormControl('', [Validators.required]),
    modality: new FormControl({disabled: true, value: ''}, [Validators.required])
  });

  ngOnInit() {
    if (this._postStore.modality()) {
      this.modality.setValue(this._postStore.modality()?.name);
      this.modality.disable();
    }
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.postForm.reset();
    this.isLoading.set(false);
  }

  private _validatePayment(): void {
    this.isLoading.set(true);
    const data: IPaymentDTO = {
      dni: this.dni.value,
      type_school: this.school.value,
      id_modality: this._postStore.modality()?.id as number,
      id_examcall: this._examStore.exam()?.id as number
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
          this._postStore.setDni(this.dni.value);
          this._postStore.setTypeSchool(this.school.value);
          this.isValidPayment.set(true);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading.set(false);
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
        complete: () => this.isLoading.set(false)
      })
    );
  }

  get dni(): FormControl {
    return this.postForm.get('dni') as FormControl;
  }

  get school(): FormControl {
    return this.postForm.get('school') as FormControl;
  }

  get modality(): FormControl {
    return this.postForm.get('modality') as FormControl;
  }

  protected validate(): void {
    if (this.postForm.invalid) {
      this._toastService.add({
        severity: 'warn',
        summary: 'Módulo de Registro',
        detail: 'Complete los campos requeridos'
      });
      this.postForm.markAllAsTouched();
      return;
    }

    this._validatePayment();
  }

  protected goBack(): void {
    this.postForm.reset();
    this._postStore.setOnboarding(false);
  }
}
