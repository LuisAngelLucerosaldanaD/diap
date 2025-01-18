import {Component, inject, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {MenuService} from "../../services/ui/menu.service";
import {TooltipModule} from "primeng/tooltip";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    NgClass,
    TooltipModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  private _menuService: MenuService = inject(MenuService);
  protected isCompact: boolean = false;

  ngOnInit(): void {
    this._menuService.menu$.subscribe((data) => {
      this.isCompact = data.show;
    });
  }
}
