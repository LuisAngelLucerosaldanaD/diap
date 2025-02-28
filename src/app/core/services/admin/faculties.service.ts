import {inject, Injectable} from '@angular/core';
import {EnvServiceFactory} from "../env/env.service.provider";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../models/response";
import {IFaculties, IFacultyDTO} from "../../models/faculties/faculties";

@Injectable({
  providedIn: 'root'
})
export class FacultiesService {
  private readonly _url: string = EnvServiceFactory().REST_API + '/api/v1/faculties';
  private _http: HttpClient = inject(HttpClient);

  public getFaculties(): Observable<IResponse<IFaculties[]>> {
    return this._http.get<IResponse<IFaculties[]>>(this._url);
  }

  public getFaculty(id: number): Observable<any> {
    return this._http.get<any>(`${this._url}/${id}`);
  }

  public createFaculty(faculty: IFacultyDTO): Observable<IResponse> {
    return this._http.post<IResponse>(this._url, faculty);
  }

  public updateFaculty(faculty: IFacultyDTO): Observable<IResponse> {
    return this._http.put<IResponse>(this._url, faculty);
  }

  public deleteFaculty(id: number): Observable<IResponse> {
    return this._http.delete<IResponse>(`${this._url}/${id}`);
  }
}
