import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { FacultiesService } from '../../../../core/services/admin/faculties.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { IFaculties } from '../../../../core/models/faculties/faculties';
import { BlockUiComponent } from '../../../../core/ui/block-ui/block-ui.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [BlockUiComponent, ToastModule],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.scss',
  providers: [MessageService],
})
export class FacultiesComponent implements OnDestroy, OnInit {
  private readonly _subscriptions: Subscription = new Subscription();

  private readonly _facultiesService = inject(FacultiesService);
  private readonly _toastService = inject(MessageService);

  protected faculties = signal<IFaculties[]>([]);
  protected loading = signal(false);

  ngOnInit() {
    this._loadFaculties();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.loading.set(false);
    this.faculties.set([]);
  }

  private _loadFaculties() {
    this.loading.set(true);
    this._subscriptions.add(
      this._facultiesService.getFaculties().subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Facultades y Escuelas',
              detail: res.msg,
            });
            return;
          }

          this.faculties.set(res.data);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Facultades y Escuelas',
            detail: err.error.msg
          });
          this.loading.set(false);
        },
        complete: () => this.loading.set(false),
      })
    );
  }
}
