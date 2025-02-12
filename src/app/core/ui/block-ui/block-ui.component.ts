import {Component, Input} from '@angular/core';
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
  @Input() show: boolean = false;
}
