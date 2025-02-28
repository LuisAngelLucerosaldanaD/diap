import { Component } from '@angular/core';
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FilterPipeModule} from "ngx-filter-pipe";
import {MenuModule} from "primeng/menu";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-modalidades',
  standalone: true,
  imports: [
    BlockUiComponent,
    ConfirmDialogModule,
    FilterPipeModule,
    MenuModule,
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    RouterLink,
    ToastModule
  ],
  templateUrl: './modalidades.component.html',
  styleUrl: './modalidades.component.scss'
})
export class ModalidadesComponent {

}
