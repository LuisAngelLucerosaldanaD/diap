import {Component, signal} from '@angular/core';
import {IFaculties} from "../../../../core/models/faculties/faculties";
import { FACULTIES } from '../../../../core/utils/constants/constants';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.scss'
})
export class FacultiesComponent {

  protected faculties = signal<any[]>(FACULTIES);

}
