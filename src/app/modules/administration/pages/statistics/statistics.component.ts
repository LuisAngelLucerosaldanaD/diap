import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {ExamsService} from "../../../../core/services/admin/exams.service";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {HttpErrorResponse} from "@angular/common/http";
import {forkJoin} from 'rxjs';
import {IResponse} from "../../../../core/models/response";
import {IExam} from "../../../../core/models/admin/exams";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    RouterLink,
    BlockUiComponent
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
  providers: [MessageService]
})
export class StatisticsComponent implements OnInit, OnDestroy {

  @Input() id: number = 0;

  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _messageService: MessageService = inject(MessageService);
  private readonly _examService: ExamsService = inject(ExamsService);

  protected isLoading: boolean = false;
  protected exam!: IExam;

  ngOnInit() {
    this._getStatistics();

    const genderChart = new Chart("ctx-gender", {
      type: 'pie',
      data: {
        labels: ['Femenino', 'Masculino'],
        datasets: [{
          data: [12, 19],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private _getStatistics() {
    this.isLoading = true;
    this._subscriptions.add(
      forkJoin([
        this._examService.getStatisticsFirstOption(this.id),
        this._examService.getStatisticsSecondOption(this.id),
        this._examService.getStatisticsSex(this.id),
        this._examService.getStatisticsModality(this.id),
        this._examService.getExam(this.id)
      ]).subscribe({
        next: ([first, second, sex, modality, exam]) => {
          console.log(first);
          console.log(second);
          console.log(sex);
          console.log(modality);
          this.processModality(modality);

          if (!exam.error) {
            this.exam = exam.data;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._messageService.add({severity: 'error', summary: 'Módulo de Examenes', detail: err.error.message});
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private processModality(res: IResponse): void {
    const data = res.data;
    new Chart("ctx", {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Cantidad de Estudiantes por Modalidad',
          data: Object.values(data),
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
