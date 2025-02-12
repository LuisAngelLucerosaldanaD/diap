import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FilterPipeModule} from "ngx-filter-pipe";
import {Menu, MenuModule} from "primeng/menu";
import {IExam} from "../../../../core/models/admin/exams";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {ExamsService} from "../../../../core/services/admin/exams.service";
import {MessageService} from "primeng/api";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {PostulationsService} from "../../../../core/services/admin/postulations.service";
import {IPostulation, ISearchPostulation} from "../../../../core/models/admin/postulation";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {RegistrationService} from "../../../../core/services/admin/registration.service";
import {FileHelper} from "../../../../core/utils/file/file";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-postulations',
  standalone: true,
  imports: [
    FilterPipeModule,
    MenuModule,
    BlockUiComponent,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './postulations.component.html',
  styleUrl: './postulations.component.scss',
  providers: [MessageService]
})
export class PostulationsComponent implements OnInit, OnDestroy {

  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _examsService: ExamsService = inject(ExamsService);
  private readonly _messageService: MessageService = inject(MessageService);
  private readonly _postulationsService: PostulationsService = inject(PostulationsService);
  private readonly _registrationService: RegistrationService = inject(RegistrationService);
  private readonly _toastService: MessageService = inject(MessageService);

  protected items = [
    {
      label: 'Acciones',
      items: [
        {
          label: 'Editar',
          icon: 'pi pi-pen-to-square',
          command: () => {
          }
        },
        {
          label: 'Ver',
          icon: 'pi pi-eye',
          command: () => {
          }
        },
        {
          label: 'Descargar ficha',
          icon: 'pi pi-download',
          command: () => this._exportPDF()
        }
      ]
    }
  ];

  protected exams: IExam[] = [];
  protected isLoading: boolean = false;
  protected formSearch: FormControl = new FormControl('');
  protected formExam: FormControl = new FormControl('');
  protected postulations: IPostulation[] = [];
  protected postulation!: IPostulation;

  ngOnInit() {
    this._getExams();
    this._subscriptions.add(
      this.formSearch.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(() => {
        this._getPostulations(this.formExam.value);
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.exams = [];
  }

  private _getExams(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._examsService.getExams().subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({
              severity: 'error',
              summary: 'Módulo de Postulaciones',
              detail: res.msg
            });
            return;
          }

          if (!res.data || !res.data.length) {
            this._messageService.add({
              severity: 'info',
              summary: 'Módulo de Postulaciones',
              detail: 'No hay convocatorias disponibles'
            });
            return;
          }

          this.exams = res.data;
          const latestItem = this.exams.reduce((latest, item) => {
            return item.created_at > latest.created_at ? item : latest;
          });
          this.formExam.setValue(latestItem.id);
          this._getPostulations(latestItem.id);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._messageService.add({
            severity: 'error',
            summary: 'Módulo de Postulaciones',
            detail: 'No se pudo obtener la información de las convocatorias'
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _getPostulations(exam: number): void {
    this.isLoading = true;
    const data: ISearchPostulation = {
      id_examcall: exam,
      search: this.formSearch.value
    }
    this._subscriptions.add(
      this._postulationsService.getPostulations(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({
              severity: 'error',
              summary: 'Módulo de Postulaciones',
              detail: res.msg
            });
            return;
          }

          this.postulations = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._messageService.add({
            severity: 'error',
            summary: 'Módulo de Postulaciones',
            detail: 'No se pudo obtener la información de las postulaciones'
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  protected changeExam(): void {
    this._getPostulations(this.formExam.value);
  }

  protected openMenu(data: IPostulation, menu: Menu, event: any): void {
    this.postulation = data;
    menu.toggle(event);
  }

  private _exportPDF(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._registrationService.getApplicationReport(this.postulation.id).subscribe({
        next: (res) => {
          if (!res) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo descargar el reporte de la postulación'
            });
            return
          }

          FileHelper.DownloadFile(res, `reporte-${this.postulation.id}-${this.postulation.applicant.DNI}.pdf`);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo descargar el reporte de la postulación'
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  protected exportReport(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._postulationsService.getReport(this.formExam.value).subscribe({
        next: (res) => {
          if (!res) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Postulaciones',
              detail: 'No se pudo descargar el reporte de la postulación'
            });
            return
          }

          FileHelper.DownloadFile(res, `reporte-${this.formExam.value}.xlsx`);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Postulaciones',
            detail: 'No se pudo descargar el reporte de la postulación'
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

}
