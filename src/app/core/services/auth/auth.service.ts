import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICredentials, ISession} from "../../models/auth/auth";
import {Observable} from "rxjs";
import {EnvServiceFactory} from "../env/env.service.provider";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http: HttpClient = inject(HttpClient);
  private readonly _url: string = EnvServiceFactory().REST_API + '/api/v1/login';

  /**
   * Method that allow us to login
   * @param credentials - The credentials to login
   * @return Observable<ISession>
   * @example
   * private _authService = inject(AuthService);
   * const data = {
   *   email: 'joe.dow@bjungle.net'
   *   password: 'password',
   *   remember_me: true
   * }
   * this._authService.login(data);
   */
  public login(credentials: ICredentials): Observable<ISession> {
    return this._http.post<ISession>(this._url, credentials);
  }
}
