import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuModule} from "primeng/menu";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-exams-complementarios',
  standalone: true,
  imports: [
    FormsModule,
    MenuModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './exams-complementarios.component.html',
  styleUrl: './exams-complementarios.component.scss'
})
export class ExamsComplementariosComponent {

}
