import {Component, inject, OnInit} from '@angular/core';
import {MenuService} from "../../services/ui/menu.service";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private readonly _menuService: MenuService = inject(MenuService);
  private readonly _authService: AuthService = inject(AuthService);
  private _isMenuVisible: boolean = false;
  protected isAuthenticated: boolean = false;
  protected user: string = '';

  ngOnInit() {
    this.isAuthenticated = this._authService.isAuthenticated();
    this.user = this._authService.getUser();
  }

  protected showMenu(): void {
    this._isMenuVisible = !this._isMenuVisible;
    this._menuService.show({show: this._isMenuVisible});
  }
}
