import {inject, Injectable} from "@angular/core";
import {EnvServiceFactory} from "../env/env.service.provider";
import {HttpClient} from "@angular/common/http";
import {IResponse} from "../../models/response";
import {Observable} from "rxjs";
import {IPostulation, ISearchPostulation} from "../../models/admin/postulation";

@Injectable({
  providedIn: 'root'
})
export class PostulationsService {
  private readonly _url: string = EnvServiceFactory().REST_API + '/api/v1/applications';
  private readonly _urlReport: string = EnvServiceFactory().REST_API + '/api/v1/export-applicants';
  private _http: HttpClient = inject(HttpClient);

  public getPostulations(data: ISearchPostulation): Observable<IResponse<IPostulation[]>> {
    return this._http.post<IResponse<IPostulation[]>>(this._url + '/filters', data);
  }

  public getReport(id: number): Observable<any> {
    return this._http.get(this._urlReport + `/${id}`, {responseType: 'blob'});
  }
}
