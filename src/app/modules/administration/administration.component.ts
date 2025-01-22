import { Component } from '@angular/core';
import {LayoutComponent} from "../../core/ui/layout/layout.component";

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    LayoutComponent
  ],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent {

}
