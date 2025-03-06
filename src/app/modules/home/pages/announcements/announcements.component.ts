import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {ExamsService} from "../../../../core/services/admin/exams.service";
import {MessageService} from "primeng/api";
import {IExam} from "../../../../core/models/admin/exams";
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {EnvServiceFactory} from "../../../../core/services/env/env.service.provider";

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
  providers: [MessageService]
})
export class AnnouncementsComponent implements OnInit, OnDestroy {
  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _examsService: ExamsService = inject(ExamsService);
  private readonly _toastService: MessageService = inject(MessageService);

  protected exam!: IExam;
  protected isLoading: boolean = false;
  protected examDate: string = '';
  protected endDate: string = '';
  protected startHour: string = '';
  protected logo = EnvServiceFactory().REST_API + '/api/v1/files/public/banner';

  ngOnInit() {
    this._getCurrentExam();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.isLoading = false;
  }

  private _getCurrentExam(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._examsService.getCurrentExams().subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener el examen actual'
            });
            return;
          }
          this.exam = res.data.reduce((latest, item) => {
            return item.created_at < latest.created_at ? item : latest;
          });
          const exam_date = new Date(this.exam.exam_date);
          const end = new Date(this.exam.end_date);
          this.examDate = new DatePipe('en-US').transform(exam_date, 'dd/MM/yyyy') || '';
          this.endDate = new DatePipe('en-US').transform(end, 'dd/MM/yyyy') || '';
          this.startHour = new DatePipe('en-US').transform(exam_date, 'hh:mm a') || '';
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isLoading = false;
          if (err.status === 404) {
            this._toastService.add({
              severity: 'warn',
              summary: 'Módulo de Anuncios',
              detail: err.error.msg
            });
            return;
          }
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener el examen actual, error: ' + err.message
          });
        },
        complete: () => this.isLoading = false
      })
    );
  }
}
