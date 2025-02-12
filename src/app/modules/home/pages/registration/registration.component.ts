import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IMode, IRequirement} from "../../../../core/models/registration/registration";
import {MODES} from "../../../../core/utils/constants/constants";
import {FormsModule} from "@angular/forms";
import {FormRegistrationComponent} from "../../../../core/ui/form-registration/form-registration.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistrationComponent {
  protected modes: IMode[] = MODES;
  protected selectedMode: string = '2';
  protected requirement: IRequirement[] = [];

  constructor() {
    const mode = this.modes.find((mode) => mode.value === this.selectedMode);
    this.requirement = mode?.requirements || [];
  }

  protected selectMode(event: any): void {
    const mode = this.modes.find((mode) => mode.value === event.target.value);
    this.requirement = mode?.requirements || [];
  }
}
