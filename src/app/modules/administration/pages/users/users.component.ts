import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../../../core/services/users/users.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ICreatUser, IUpdateUser, IUsers} from "../../../../core/models/users/users";
import {PaginatorModule} from "primeng/paginator";
import {FilterPipeModule} from "ngx-filter-pipe";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MenuModule} from "primeng/menu";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BlockUIModule} from "primeng/blockui";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ToastModule,
    PaginatorModule,
    FilterPipeModule,
    NgIf,
    ReactiveFormsModule,
    MenuModule,
    ConfirmDialogModule,
    BlockUIModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription = new Subscription();
  private readonly _messageService: MessageService = inject(MessageService);
  private readonly _confirmService: ConfirmationService = inject(ConfirmationService);
  private readonly _usersService: UsersService = inject(UsersService);

  protected userFilter: any = {name: ''};
  protected users: IUsers[] = [];
  protected isLoading: boolean = false;
  protected openModal: boolean = false;
  protected userForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
  });
  protected type: string = 'create';
  protected items = [
    {
      label: 'Acciones',
      items: [
        {
          label: 'Editar',
          icon: 'pi pi-refresh',
          command: () => this.updateUser(this.user)
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-upload',
          command: () => this.deleteUser()
        }
      ]
    }
  ];
  protected user!: IUsers;

  ngOnInit() {
    this._getUsers();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private _getUsers(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._usersService.getUsers().subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({severity: 'error', summary: 'Módulo de Ususarios', detail: res.msg});
            return;
          }

          console.log(res.data);
          this.users = res.data;
        },
        error: (err: HttpErrorResponse) => {
          this._messageService.add({severity: 'error', summary: 'Módulo de Usuarios', detail: err.message});
          this.isLoading = false;
          console.error(err);
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _deleteUser(id: number): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._usersService.deleteUser(id).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({severity: 'error', summary: 'Módulo de Usuarios', detail: res.msg});
            return;
          }

          this._messageService.add({severity: 'success', summary: 'Módulo de Usuarios', detail: res.msg});
          this.users = this.users.filter((user) => user.id !== id);
        },
        error: (err: HttpErrorResponse) => {
          this._messageService.add({severity: 'error', summary: 'Módulo de Usuarios', detail: err.message});
          this.isLoading = false;
          console.error(err);
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _createUser(data: ICreatUser): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._usersService.createUser(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({severity: 'error', summary: 'Módulo de Usuarios', detail: res.msg});
            return;
          }

          this._messageService.add({severity: 'success', summary: 'Módulo de Usuarios', detail: res.msg});
          this.users.push(res.data);
          this.openModal = false;
        },
        error: (err: HttpErrorResponse) => {
          this._messageService.add({severity: 'error', summary: 'Módulo de Usuarios', detail: err.message});
          this.isLoading = false;
          console.error(err);
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _updateUser(data: IUpdateUser): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._usersService.updateUser(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({severity: 'error', summary: 'Módulo de Usuarios', detail: res.msg});
            return;
          }

          this._messageService.add({severity: 'success', summary: 'Módulo de Usuarios', detail: res.msg});
          const index = this.users.findIndex((user) => user.id === data.id);
          this.users[index] = res.data;
        },
        error: (err: HttpErrorResponse) => {
          this._messageService.add({severity: 'error', summary: 'Módulo de Usuarios', detail: err.message});
          this.isLoading = false;
          console.error(err);
        },
        complete: () => this.isLoading = false
      })
    );
  }

  protected saveUser(): void {
    if (this.userForm.invalid) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Módulo de Usuarios',
        detail: 'Todos los campos son requeridos'
      });
      return;
    }

    if (this.type === 'create') {
      const data: ICreatUser = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        role: parseInt(this.userForm.value.role),
        password: this.userForm.value.password,
      };
      return this._createUser(data);
    }

    const data: IUpdateUser = {
      id: this.userForm.value.id,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role: parseInt(this.userForm.value.role),
    };

    this._updateUser(data);
  }

  protected updateUser(user: IUsers): void {
    this.type = 'update';
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role === 'Dirección' ? '1' : '2',
    });
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    this.openModal = true;
  }

  protected createUser(): void {
    this.type = 'create';
    this.userForm.reset();
    this.openModal = true;
  }

  protected closeModal(): void {
    this.openModal = false;
    this.userForm.reset();
  }

  protected deleteUser(): void {
    this._confirmService.confirm({
      header: 'Módulos de Usuarios',
      message: `¿Estás seguro de eliminar al usuario ${this.user.name}?`,
      accept: () => this._deleteUser(this.user.id),
      key: 'users'
    });
  }

}
