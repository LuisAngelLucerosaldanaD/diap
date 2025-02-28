import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuModule} from "primeng/menu";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-requisitos',
  standalone: true,
    imports: [
        FormsModule,
        MenuModule,
        NgIf,
        PaginatorModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './requisitos.component.html',
  styleUrl: './requisitos.component.scss'
})
export class RequisitosComponent {

}
