import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICredentials, ISession} from "../../models/auth/auth";
import {Observable} from "rxjs";
import {EnvServiceFactory} from "../env/env.service.provider";
import {Cipher} from "../../utils/security/cipher";
import {JwtHelper} from "../../utils/jwt/jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http: HttpClient = inject(HttpClient);
  private _router: Router = inject(Router);
  private readonly _url: string = EnvServiceFactory().REST_API + '/api/v1/login';
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
    return this._http.post<ISession>(this._url, credentials);
  }

  public logout(): void {
    sessionStorage.removeItem('token');
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
      this.logout();
      return false;
    }

    return true;
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
