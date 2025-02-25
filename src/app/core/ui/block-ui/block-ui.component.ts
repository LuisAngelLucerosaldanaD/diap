import {Component, input} from '@angular/core';
import {BlockUIModule} from "primeng/blockui";

@Component({
  selector: 'app-block-ui',
  standalone: true,
  imports: [
    BlockUIModule
  ],
  templateUrl: './block-ui.component.html',
  styleUrl: './block-ui.component.scss'
})
export class BlockUiComponent {
  public show = input.required<boolean>();
}
