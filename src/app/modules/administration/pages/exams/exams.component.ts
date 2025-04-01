import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FilterPipeModule} from "ngx-filter-pipe";
import {Menu, MenuModule} from "primeng/menu";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExamsService} from "../../../../core/services/admin/exams.service";
import {ICreateExam, IExam, IUpdateExam} from "../../../../core/models/admin/exams";
import {Subscription} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {BlockUIModule} from "primeng/blockui";
import {NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {Router} from "@angular/router";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    FilterPipeModule,
    MenuModule,
    ReactiveFormsModule,
    BlockUIModule,
    FormsModule,
    NgIf,
    ToastModule,
    ConfirmDialogModule,
    BlockUiComponent
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ExamsComponent implements OnInit, OnDestroy {
  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _examsService: ExamsService = inject(ExamsService);
  private readonly _messageService: MessageService = inject(MessageService);
  private readonly _confirmService: ConfirmationService = inject(ConfirmationService);
  private readonly _route: Router = inject(Router);
  protected items = [
    {
      label: 'Acciones',
      items: [
        {
          label: 'Editar',
          icon: 'pi pi-pen-to-square',
          command: () => this.updateExam()
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          command: () => this.deleteExam()
        },
        {
          label: 'Datos Estadísticos',
          icon: 'pi pi-chart-bar',
          command: () => this._route.navigate(['/admin/statistics', this.exam.id])
        }
      ]
    }
  ];
  protected exams: IExam[] = [];
  protected isLoading: boolean = false;
  protected userFilter: any = {name: ''};
  protected openModal: boolean = false;
  protected exam!: IExam;
  protected typeEvent: 'create' | 'update' = 'create';
  protected examForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    exam_date: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this._getExams();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.exams = [];
    this.examForm.reset();
    this.items = [];
  }

  private _getExams(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._examsService.getExams().subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({
              severity: 'error',
              summary: 'Módulo de Examenes',
              detail: res.msg
            });
            return;
          }

          this.exams = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._messageService.add({
            severity: 'error',
            summary: 'Módulo de Examenes',
            detail: 'No se pudo obtener la información de los examenes'
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _createExam(data: ICreateExam): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._examsService.createExam(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({
              severity: 'error',
              summary: 'Módulo de Examenes',
              detail: res.msg
            });
            return;
          }

          this._messageService.add({
            severity: 'success',
            summary: 'Módulo de Examenes',
            detail: res.msg
          });
          this._getExams();
          this.cancelModal();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._messageService.add({
            severity: 'error',
            summary: 'Módulo de Examenes',
            detail: err.error.msg || 'No se pudo crear el examen'
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _updateExam(data: IUpdateExam): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._examsService.updateExam(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({
              severity: 'error',
              summary: 'Módulo de Examenes',
              detail: res.msg
            });
            return;
          }

          this._messageService.add({
            severity: 'success',
            summary: 'Módulo de Examenes',
            detail: res.msg
          });
          this._getExams();
          this.cancelModal();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._messageService.add({
            severity: 'error',
            summary: 'Módulo de Examenes',
            detail: 'No se pudo actualizar el examen'
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _deleteExam(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._examsService.deleteExam(this.exam.id).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({
              severity: 'error',
              summary: 'Módulo de Examenes',
              detail: res.msg
            });
            return;
          }

          this._messageService.add({
            severity: 'success',
            summary: 'Módulo de Examenes',
            detail: res.msg
          });
          this.exams = this.exams.filter((exam) => exam.id !== this.exam.id);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._messageService.add({
            severity: 'error',
            summary: 'Módulo de Examenes',
            detail: 'No se pudo eliminar el examen'
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  protected openMenu(data: IExam, menu: Menu, event: any): void {
    this.exam = data;
    menu.toggle(event);
  }

  protected updateExam(): void {
    this.typeEvent = 'update';
    this.openModal = true;
    this.examForm.patchValue({
      id: this.exam.id,
      name: this.exam.name,
      description: this.exam.description,
      contact: this.exam.contact,
      start_date: this.exam.start_date,
      end_date: this.exam.end_date,
      exam_date: this.exam.exam_date,
      type: this.exam.id_examtype,
    });
  }

  protected createExam(): void {
    this.typeEvent = 'create';
    this.openModal = true;
    this.examForm.reset();
  }

  protected saveExam(): void {
    if (this.examForm.invalid) {
      this._messageService.add({
        severity: 'error',
        summary: 'Módulo de Examenes',
        detail: 'Todos los campos son requeridos'
      });
      return;
    }

    if (this.typeEvent === 'create') {
      const data: ICreateExam = {
        name: this.examForm.value.name,
        description: this.examForm.value.description,
        contact: this.examForm.value.contact,
        start_date: this.examForm.value.start_date,
        end_date: this.examForm.value.end_date,
        exam_date: this.examForm.value.exam_date,
        id_examtype: this.examForm.value.type
      };
      return this._createExam(data);
    }

    const data: IUpdateExam = {
      id: this.examForm.value.id,
      name: this.examForm.value.name,
      description: this.examForm.value.description,
      contact: this.examForm.value.contact,
      start_date: this.examForm.value.start_date,
      end_date: this.examForm.value.end_date,
      exam_date: this.examForm.value.exam_date,
      id_examtype: this.examForm.value.type
    };

    return this._updateExam(data);
  }

  protected cancelModal(): void {
    this.examForm.reset();
    this.openModal = false;
    this.typeEvent = 'create';
  }

  protected deleteExam(): void {
    this._confirmService.confirm({
      header: 'Módulo de Examenes',
      message: '¿Estás seguro de eliminar el examen?',
      accept: () => this._deleteExam(),
      key: 'exams'
    });
  }
}
