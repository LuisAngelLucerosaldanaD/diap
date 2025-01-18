import {Component} from '@angular/core';
import {LayoutComponent} from "../../core/ui/layout/layout.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
