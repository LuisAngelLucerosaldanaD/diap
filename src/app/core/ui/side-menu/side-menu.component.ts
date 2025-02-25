import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { TooltipModule } from "primeng/tooltip";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastModule } from "primeng/toast";
import { BlockUiComponent } from "../block-ui/block-ui.component";
import { AuthStore } from '../../store/auth.store';
import { AppStore } from '../../store/app.store';
import { SidebarModule } from 'primeng/sidebar';
import { ActiveRouteDirective } from '../../directives/active-route.directive';

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
    BlockUiComponent,
    SidebarModule,
    ActiveRouteDirective
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _confirmService: ConfirmationService = inject(ConfirmationService);
  private readonly _toastService: MessageService = inject(MessageService);
  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _router: Router = inject(Router);

  protected readonly appStore = inject(AppStore);
  protected readonly authStore = inject(AuthStore);
  protected isLoading: boolean = false;

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
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
                this._toastService.add({ severity: 'error', summary: 'Cerrar Sesión', detail: res.msg });
                return;
              }

              this._authService.logout();
              this.authStore.logout();
              this.appStore.setHomeMenu();
            },
            error: (err: HttpErrorResponse) => {
              this.isLoading = false
              this._toastService.add({ severity: 'error', summary: 'Cerrar Sesión', detail: err.message });
              console.error(err);
              if (this.appStore.isMobileDevice()) this.appStore.toggleMenu();
              
            },
            complete: () => {
              if (this.appStore.isMobileDevice()) this.appStore.toggleMenu();
              this.isLoading = false
            }
          })
        );
      }
    });
  }

  protected goToRoute(route: string): void {
    this._router.navigateByUrl(route).then(() => {
      this.appStore.toggleMenu();
    });
  }
}
