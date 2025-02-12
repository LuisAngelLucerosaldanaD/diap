import {inject, Injectable} from '@angular/core';
import {EnvServiceFactory} from "../env/env.service.provider";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResAddress, IResponse} from "../../models/response";
import {IDistrict, IProvince, IRegion, ISchool} from "../../models/registration/address";
import {
  IAcademicDTO,
  IAnswer,
  IApplicantDTO, IDocumentDTO,
  IPayment,
  IPaymentDTO,
  ISchoolDTO
} from "../../models/registration/registration";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly _url: string = EnvServiceFactory().REST_API + '/api/v1/registration';
  private readonly _urlPayment: string = EnvServiceFactory().REST_API + '/api/v1/validate-payment';
  private readonly _urlFile: string = EnvServiceFactory().REST_API + '/api/v1/upload';
  private readonly _urlSchool: string = EnvServiceFactory().REST_API + '/api/v1/schools';
  private readonly _urlApplicant: string = EnvServiceFactory().REST_API + '/api/v1/applicants';
  private readonly _urlApplications: string = EnvServiceFactory().REST_API + '/api/v1/applications';
  private readonly _urlAnswers: string = EnvServiceFactory().REST_API + '/api/v1/answers';
  private readonly _urlApplicationDocuments: string = EnvServiceFactory().REST_API + '/api/v1/aplication-documents';
  private readonly _urlAddress: string = EnvServiceFactory().ADDRESS_API;
  private _http: HttpClient = inject(HttpClient);

  public getRegions(): Observable<IResAddress<IRegion[]>> {
    return this._http.get<IResAddress<IRegion[]>>(this._urlAddress + '/regiones');
  }

  public getProvinces(id: string): Observable<IResAddress<IProvince[]>> {
    return this._http.get<IResAddress<IProvince[]>>(this._urlAddress + `/provincias/${id}`)
  }

  public getDistricts(id: string): Observable<IResAddress<IDistrict[]>> {
    return this._http.get<IResAddress<IDistrict[]>>(this._urlAddress + `/distritos/${id}`);
  }

  public getSchools(id: string): Observable<IResAddress<ISchool[]>> {
    return this._http.get<IResAddress<ISchool[]>>(this._urlAddress + `/colegios/${id}`)
  }

  public validatePayment(data: IPaymentDTO): Observable<IResponse<IPayment | IPayment[]>> {
    return this._http.post<IResponse<IPayment | IPayment[]>>(this._urlPayment, data)
  }

  public uploadProfile(data: FormData): Observable<IResponse> {
    return this._http.post<IResponse>(this._urlFile + '/photo', data)
  }

  public uploadFile(data: FormData): Observable<IResponse> {
    return this._http.post<IResponse>(this._urlFile + '/file', data)
  }

  public registerSchool(data: ISchoolDTO): Observable<IResponse> {
    return this._http.post<IResponse>(this._urlSchool, data);
  }

  public registerApplicant(data: IApplicantDTO): Observable<IResponse> {
    return this._http.post<IResponse>(this._urlApplicant, data);
  }

  public registerAcademic(data: IAcademicDTO): Observable<IResponse> {
    return this._http.post<IResponse>(this._urlApplications, data);
  }

  public registerAnswers(data: IAnswer): Observable<IResponse> {
    return this._http.post<IResponse>(this._urlAnswers, data);
  }

  public registerDocument(data: IDocumentDTO): Observable<IResponse> {
    return this._http.post<IResponse>(this._urlApplicationDocuments, data);
  }

  public getApplicationReport(id: number): Observable<any> {
    return this._http.get(this._urlApplications + `/${id}/pdf`, { responseType: 'blob' });
  }
}
