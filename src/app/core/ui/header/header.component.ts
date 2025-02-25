import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import { AuthStore } from '../../store/auth.store';
import { AppStore } from '../../store/app.store';

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
  protected readonly appStore = inject(AppStore);
  protected readonly store = inject(AuthStore);

  protected showMenu(): void {
    this.appStore.toggleMenu();
  }
}
