import {Component, inject} from '@angular/core';
import {MenuService} from "../../services/ui/menu.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _menuService: MenuService = inject(MenuService);
  private _isMenuVisible: boolean = false;


  protected showMenu(): void {
    this._isMenuVisible = !this._isMenuVisible;
    this._menuService.show({show: this._isMenuVisible});
  }
}
