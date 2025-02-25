import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ICredentials, IDataSession, ISession } from "../../models/auth/auth";
import { Observable } from "rxjs";
import { EnvServiceFactory } from "../env/env.service.provider";
import { Cipher } from "../../utils/security/cipher";
import { JwtHelper } from "../../utils/jwt/jwt";
import { Router } from "@angular/router";
import { IResponse } from "../../models/response";
import { SESSION } from '../../types/session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _url: string = EnvServiceFactory().REST_API + '/api/v1';
  private _http: HttpClient = inject(HttpClient);
  private _router: Router = inject(Router);
  private _cipher: Cipher = new Cipher();
  private _jwtHelper: JwtHelper = new JwtHelper();


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
    return this._http.post<ISession>(this._url + '/login', credentials);
  }

  public setLogout(): Observable<IResponse> {
    return this._http.get<IResponse>(this._url + '/logout');
  }

  public logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this._router.navigateByUrl('/home');
  }

  /**
   * Method that allow us to check if the user is authenticated
   * @return boolean
   */
  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    if (!this._cipher.verifyJWT(token) || this._jwtHelper.isTokenExpired(token)) {
      this.setLogout().subscribe((res) => {
        if (!res.error) return this.logout();
      });
      return false;
    }

    return true;
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }

  public getRole(): number {
    const user = sessionStorage.getItem('user') || localStorage.getItem('user');
    if (!user) return -1;

    return JSON.parse(atob(user)).id_role;
  }

  public getUser(): string {
    const user = sessionStorage.getItem('user') || localStorage.getItem('user');
    if (!user) return '';

    return JSON.parse(atob(user)).name;
  }

  public setSession(session: IDataSession, remainder: SESSION = 'temporary'): void {
    const token = session.token.replace('Bearer ', '');
    if (remainder === 'permanent') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', btoa(JSON.stringify(session)));
      localStorage.setItem('session', btoa(remainder));
      sessionStorage.clear();
      return;
    }

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', btoa(JSON.stringify(session)));
    sessionStorage.setItem('session', btoa(remainder));
    localStorage.clear();
  }
}
