import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {IFormValidation} from "../../../../core/models/ui/form";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnDestroy {

  private _subscriptions: Subscription = new Subscription();

  protected loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    remember_me: new FormControl(false)
  });
  protected emailValidation: IFormValidation = {
    error: false,
    msg: ''
  };
  protected pwdValidation: IFormValidation = {
    error: false,
    msg: ''
  };
  protected isLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _toastService: MessageService,
    private _router: Router
  ) {
    this._subscriptions.add(
      this.email.statusChanges.subscribe((status) => {
        if (this.email.untouched) {
          return;
        }

        if (status === 'INVALID') {
          this.emailValidation.error = true;
          this._emailErrorMsg();
          return;
        }

        this.emailValidation.error = false;
        this.emailValidation.msg = '';
      })
    );

    this._subscriptions.add(
      this.password.statusChanges.subscribe((status) => {
        if (this.password.untouched) {
          return;
        }

        if (status === 'INVALID') {
          this.pwdValidation.error = true;
          this._pwdErrorMsg();
          return;
        }

        this.pwdValidation.error = false;
        this.pwdValidation.msg = '';
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private _pwdErrorMsg(): void {
    if (this.password.hasError('required')) {
      this.pwdValidation.msg = 'La contraseña es requerida!';
      return;
    }
  }

  private _emailErrorMsg(): void {
    if (this.email.hasError('required')) {
      this.emailValidation.msg = 'El correo es requerido!';
      return;
    }

    if (this.email.hasError('email')) {
      this.emailValidation.msg = 'Ingrese un correo valido!';
      return;
    }
  }

  private get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  private get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  protected login(): void {
    if (this.loginForm.invalid) {
      this._toastService.add({
        severity: 'error',
        summary: 'Inicio de sessión',
        detail: 'Complete correctamente los campos requeridos'
      });
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this._subscriptions.add(
      this._authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (!res.data) {
            this._toastService.add({
              severity: 'error',
              summary: 'Inicio de sessión',
              detail: res.msg
            });
            return;
          }

          sessionStorage.setItem('token', res.data.token);

        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error(error);
          this._toastService.add({
            severity: 'error',
            summary: 'Inicio de sessión',
            detail: 'No se pudo iniciar sesión, intente de nuevo'
          });
          return;
        },
        complete: () => this.isLoading = false
      })
    );
  }

}
