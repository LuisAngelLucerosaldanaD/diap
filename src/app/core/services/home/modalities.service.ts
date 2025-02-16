import {inject, Injectable} from '@angular/core';
import {EnvServiceFactory} from "../env/env.service.provider";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../models/response";
import {ICost, IRequirement} from "../../models/registration/registration";
import {IModality} from "../../models/admin/postulation";

@Injectable({
  providedIn: 'root'
})
export class ModalitiesService {
  private readonly _urlRequirements: string = EnvServiceFactory().REST_API + '/api/v1/requirements';
  private readonly _urlModalities: string = EnvServiceFactory().REST_API + '/api/v1/modalities';
  private _http: HttpClient = inject(HttpClient);

  public getRequirementsByModality(id: number): Observable<IResponse<IRequirement[]>> {
    return this._http.get<IResponse<IRequirement[]>>(this._urlRequirements + `/modality/${id}`);
  }

  public getCostsByModality(id: number, school: string): Observable<IResponse<ICost>> {
    return this._http.post<IResponse<ICost>>(this._urlModalities + '/cost', {
      type_schoolApplicant: school,
      id_modality: id
    });
  }

  public getModalities(exam: number): Observable<IResponse<IModality[]>> {
    return this._http.get<IResponse<IModality[]>>(this._urlModalities + `/type/${exam}`);
  }
}
