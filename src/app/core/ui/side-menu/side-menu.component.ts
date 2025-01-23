import {Component, inject, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {MenuService} from "../../services/ui/menu.service";
import {TooltipModule} from "primeng/tooltip";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IMenuItem} from "../../models/ui/menu";
import {AUTH_MENU, HOME_MENU} from "../../utils/constants/constants";
import {AuthService} from "../../services/auth/auth.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    NgClass,
    TooltipModule,
    RouterLink,
    RouterLinkActive,
    ConfirmDialogModule
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  providers: [ConfirmationService]
})
export class SideMenuComponent implements OnInit {
  private _menuService: MenuService = inject(MenuService);
  private _authService: AuthService = inject(AuthService);
  private _confirmService: ConfirmationService = inject(ConfirmationService);
  protected isCompact: boolean = false;
  protected menuItems: IMenuItem[] = HOME_MENU;
  protected isAuthenticated: boolean = false;

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this.isAuthenticated = true;
      this.menuItems = AUTH_MENU;
    }

    this._menuService.menu$.subscribe((data) => {
      this.isCompact = data.show;
    });
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
        this._authService.logout();
      }
    });
  }
}
