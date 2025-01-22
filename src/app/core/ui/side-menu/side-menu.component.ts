import {Component, inject, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {MenuService} from "../../services/ui/menu.service";
import {TooltipModule} from "primeng/tooltip";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IMenuItem} from "../../models/ui/menu";

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
  protected menuItems: IMenuItem[] = [
    {
      name: 'INICIO',
      route: '/home',
      icon: 'fa-house'
    },
    {
      name: 'FACULTADES',
      route: '/home/faculties',
      icon: 'fa-graduation-cap'
    },
    {
      name: 'INSCRIPCIÓN',
      route: '/home/registration',
      icon: 'fa-file-pen'
    },
    {
      name: 'MODALIDADES',
      route: '/home/modalities',
      icon: 'fa-shuffle'
    },
    {
      name: 'Usuarios',
      route: '/admin/users',
      icon: 'fa-user'
    },
    {
      name: 'Examenes',
      route: '/admin/exams',
      icon: 'fa-file'
    },
    {
      name: 'Postulaciones',
      route: '/admin/postulations',
      icon: 'fa-book'
    }
  ];

  ngOnInit(): void {
    this._menuService.menu$.subscribe((data) => {
      this.isCompact = data.show;
    });
  }
}
