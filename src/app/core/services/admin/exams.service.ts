import {inject, Injectable} from '@angular/core';
import {EnvServiceFactory} from "../env/env.service.provider";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../models/response";
import {ICreateExam, IExam, IUpdateExam} from "../../models/admin/exams";

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  private readonly _url: string = EnvServiceFactory().REST_API + '/api/v1/examcalls';
  private _http: HttpClient = inject(HttpClient);

  public getExams(): Observable<IResponse<IExam[]>> {
    return this._http.get<IResponse<IExam[]>>(this._url);
  }

  public createExam(exam: ICreateExam): Observable<IResponse> {
    return this._http.post<IResponse>(this._url, exam);
  }

  public updateExam(exam: IUpdateExam): Observable<IResponse> {
    return this._http.put<IResponse>(this._url, exam);
  }

  public deleteExam(id: number): Observable<IResponse> {
    return this._http.delete<IResponse>(`${this._url}/${id}`);
  }
}
