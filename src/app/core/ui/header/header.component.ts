import {Component, inject} from '@angular/core';
import {MenuService} from "../../services/ui/menu.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
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
