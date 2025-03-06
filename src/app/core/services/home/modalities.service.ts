import {inject, Injectable} from '@angular/core';
import {EnvServiceFactory} from "../env/env.service.provider";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../models/response";
import {ICost} from "../../models/registration/registration";
import {IModality, IModalityDTO} from "../../models/admin/postulation";
import {IRequirement, IRequirementDTO} from "../../models/admin/modality";

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

  public createModality(modality: IModalityDTO): Observable<IResponse<IModality>> {
    return this._http.post<IResponse<IModality>>(this._urlModalities, modality);
  }

  public updateModality(id: number, modality: IModalityDTO): Observable<IResponse<IModality>> {
    return this._http.put<IResponse<IModality>>(this._urlModalities + `/${id}`, modality);
  }

  public deleteModality(id: number): Observable<IResponse<IModality>> {
    return this._http.delete<IResponse<IModality>>(this._urlModalities + `/${id}`);
  }

  public createRequirement(data: IRequirementDTO): Observable<IResponse<IRequirement>> {
    return this._http.post<IResponse<IRequirement>>(this._urlRequirements, data);
  }

  public updateRequirement(id: string, data: IRequirementDTO): Observable<IResponse<IRequirement>> {
    return this._http.put<IResponse<IRequirement>>(this._urlRequirements + `/${id}`, data);
  }

  public deleteRequirement(id: string): Observable<IResponse<IRequirement>> {
    return this._http.delete<IResponse<IRequirement>>(this._urlRequirements + `/${id}`);
  }

}
