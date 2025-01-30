import {inject, Injectable} from '@angular/core';
import {EnvServiceFactory} from "../env/env.service.provider";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../models/response";
import {ICreatUser, IUpdateUser, IUsers} from "../../models/users/users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _url: string = EnvServiceFactory().REST_API + '/api/v1/users';
  private _http: HttpClient = inject(HttpClient);

  public getUsers(): Observable<IResponse<IUsers[]>> {
    return this._http.get<IResponse<IUsers[]>>(this._url);
  }

  public getUser(id: number): Observable<any> {
    return this._http.get<any>(`${this._url}/${id}`);
  }

  public createUser(user: ICreatUser): Observable<IResponse> {
    return this._http.post<IResponse>(this._url, user);
  }

  public updateUser(user: IUpdateUser): Observable<IResponse> {
    return this._http.put<IResponse>(this._url, user);
  }

  public deleteUser(id: number): Observable<IResponse> {
    return this._http.delete<IResponse>(`${this._url}/${id}`);
  }

}
