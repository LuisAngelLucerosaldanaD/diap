import {inject, Injectable} from '@angular/core';
import {EnvServiceFactory} from "../env/env.service.provider";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../models/response";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly _url: string = EnvServiceFactory().REST_API + '/api/v1/setting';
  private readonly _urlFiles: string = EnvServiceFactory().REST_API + '/api/v1/files/public';
  private _http: HttpClient = inject(HttpClient);

  public getImage(type: string): Observable<Blob> {
    return this._http.get(this._urlFiles + `/${type}`, {responseType: 'blob'});
  }

  public saveImage(data: FormData, type: string): Observable<IResponse> {
    return this._http.post<IResponse>(this._url + `/${type}`, data);
  }
}
