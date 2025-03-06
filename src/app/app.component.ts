import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { AuthStore } from './core/store/auth.store';
import { AuthService } from './core/services/auth/auth.service';
import { AppStore } from './core/store/app.store';
import { AUTH_MENU, HOME_MENU } from './core/utils/constants/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _store = inject(AuthStore);
  private readonly _appStore = inject(AppStore);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  title = 'diap';
  constructor() {
    if (this._authService.isAuthenticated()) {
      this._store.updateSession({
        token: this._authService.getToken() || '',
        isAuth: true,
        role: this._authService.getRole(),
        user: this._authService.getUser()
      });

      this._appStore.setAppState({
        menuItems: AUTH_MENU.filter((item) => item.roles.includes(this._store.role())),
        isMobileDevice: this._isMobileDevice(),
        menuIsCompact: this._isMobileDevice(),
        modality: null
      });
      this._router.navigateByUrl('/admin/postulations');
      return;
    }

    this._appStore.setAppState({
      menuItems: HOME_MENU,
      isMobileDevice: this._isMobileDevice(),
      menuIsCompact: this._isMobileDevice(),
      modality: null
    });
  }

  private _isMobileDevice(): boolean {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
}
