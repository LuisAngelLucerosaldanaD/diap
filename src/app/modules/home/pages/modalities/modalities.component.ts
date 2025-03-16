import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {IModality, IModalityShow} from "../../../../core/models/admin/postulation";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {ModalitiesService} from "../../../../core/services/home/modalities.service";
import {MessageService} from "primeng/api";
import {BlockUiComponent} from "../../../../core/ui/block-ui/block-ui.component";
import {ToastModule} from "primeng/toast";
import {IResponse} from "../../../../core/models/response";
import {IRequirement} from "../../../../core/models/admin/modality";

@Component({
  selector: 'app-modalities',
  standalone: true,
  imports: [
    BlockUiComponent,
    ToastModule
  ],
  templateUrl: './modalities.component.html',
  styleUrl: './modalities.component.scss',
  providers: [MessageService]
})
export class ModalitiesComponent implements OnInit, OnDestroy {

  private readonly _subscriptions: Subscription = new Subscription();

  // Services
  private readonly _modalitiesService: ModalitiesService = inject(ModalitiesService);
  private readonly _toastService: MessageService = inject(MessageService);

  protected modalitiesExtra = signal<IModalityShow[]>([]);
  protected modalitiesOrd = signal<IModalityShow[]>([]);
  protected loading = signal(false);

  ngOnInit() {
    this._getModalities(2);
    this._getModalities(1);
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.modalitiesOrd.set([]);
    this.modalitiesExtra.set([]);
    this.loading.set(false);
  }

  private _getModalities(exam: number) {
    this.loading.set(true);
    this._subscriptions.add(
      this._modalitiesService.getModalities(exam).subscribe({
        next: async (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Modalidades',
              detail: res.msg
            });

            return;
          }
          const modalities: IModalityShow[] = [];
          for (const re of res.data) {
            const req = await this._getFileRequired(re.id);
            modalities.push({
              created_at: re.created_at,
              description: re.description,
              id: re.id,
              id_examtype: re.id_examtype,
              name: re.name,
              private_school_code_pay: re.private_school_code_pay,
              private_school_price: re.private_school_price,
              requirements: req.error ? [] : req.data,
              state_school_code_pay: re.state_school_code_pay,
              state_school_price: re.state_school_price,
              updated_at: re.updated_at
            });
          }
          if (exam === 2) {
            this.modalitiesExtra.set(modalities);
          } else {
            this.modalitiesOrd.set(modalities);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.loading.set(false);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Modalidades',
            detail: 'Error al obtener las modalidades, intente nuevamente'
          });
        },
        complete: () => this.loading.set(false)
      })
    );
  }

  private _getFileRequired(id: number): Promise<IResponse<IRequirement[]>> {
    return new Promise((resolve) => {
      this._subscriptions.add(
        this._modalitiesService.getRequirementsByModality(id).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            resolve({
              error: false,
              data: [],
              msg: err?.error?.msg || err.message,
              type: 'error'
            });
          }
        })
      );
    });
  }

}
