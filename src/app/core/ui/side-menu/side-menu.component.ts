import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {MenuService} from "../../services/ui/menu.service";
import {TooltipModule} from "primeng/tooltip";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IMenuItem} from "../../models/ui/menu";
import {AUTH_MENU, HOME_MENU} from "../../utils/constants/constants";
import {AuthService} from "../../services/auth/auth.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {BlockUiComponent} from "../block-ui/block-ui.component";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    NgClass,
    TooltipModule,
    RouterLink,
    RouterLinkActive,
    ConfirmDialogModule,
    ToastModule,
    BlockUiComponent
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private readonly _menuService: MenuService = inject(MenuService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _confirmService: ConfirmationService = inject(ConfirmationService);
  private readonly _toastService: MessageService = inject(MessageService);
  private readonly _subscriptions: Subscription = new Subscription();
  protected isCompact: boolean = false;
  protected menuItems: IMenuItem[] = HOME_MENU;
  protected isAuthenticated: boolean = false;
  protected isLoading: boolean = false;

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this.isAuthenticated = true;
      this.menuItems = AUTH_MENU.filter((item) => item.roles.includes(this._authService.getRole()));
    }

    this._menuService.menu$.subscribe(() => {
      this.isCompact = !this.isCompact;
    });

    if (this.isMobileDevice()) {
      this.isCompact = true;
    }
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private isMobileDevice(): boolean {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  protected logout(): void {
    this._confirmService.confirm({
      key: 'logout',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      header: 'Cerrar sesión',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.isLoading = true;
        this._subscriptions.add(
          this._authService.setLogout().subscribe({
            next: (res) => {
              if (res.error) {
                this._toastService.add({severity: 'error', summary: 'Cerrar Sesión', detail: res.msg});
                return;
              }

              this._authService.logout();
            },
            error: (err: HttpErrorResponse) => {
              this.isLoading = false
              this._toastService.add({severity: 'error', summary: 'Cerrar Sesión', detail: err.message});
              console.error(err);
            },
            complete: () => this.isLoading = false
          })
        );
      }
    });
  }
}
