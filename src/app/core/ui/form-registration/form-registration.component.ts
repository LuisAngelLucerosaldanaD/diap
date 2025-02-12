import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {RegistrationService} from "../../services/admin/registration.service";
import {MessageService} from "primeng/api";
import {IDistrict, IProvince, IRegion, ISchool} from "../../models/registration/address";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {BlockUiComponent} from "../block-ui/block-ui.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FacultiesOptions, ModalityOptions} from "../../utils/constants/constants";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducers";
import {
  IAcademicDTO, IAnswer,
  IApplicantDTO,
  ICost, IDocumentDTO,
  IPayment, IPaymentDTO,
  IRequirement,
  ISchoolDTO
} from "../../models/registration/registration";
import {NameInpDirective} from "../../directives/name-inp.directive";
import {NumbersInpDirective} from "../../directives/numbers-inp.directive";
import {ModalitiesService} from "../../services/home/modalities.service";
import {FileHelper} from "../../utils/file/file";
import {NgIf} from "@angular/common";
import {IResponse} from "../../models/response";
import {IExam} from "../../models/admin/exams";
import {selectExam} from "../../store/reducers/exam.reducer";
import {selectPayments} from "../../store/reducers/payment.reducer";

@Component({
  selector: 'app-form-registration',
  standalone: true,
  imports: [
    ToastModule,
    BlockUiComponent,
    ReactiveFormsModule,
    NameInpDirective,
    NumbersInpDirective,
    NgIf
  ],
  templateUrl: './form-registration.component.html',
  styleUrl: './form-registration.component.scss',
  providers: [MessageService]
})
export class FormRegistrationComponent implements OnInit, OnDestroy {
  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _registrationService: RegistrationService = inject(RegistrationService);
  private readonly _modalitiesService: ModalitiesService = inject(ModalitiesService);
  private readonly _toastService: MessageService = inject(MessageService);
  private readonly _store: Store<AppState> = inject(Store);
  private _payments$ = this._store.select(selectPayments);
  private _exam$ = this._store.select(selectExam);
  private _payment: IPayment | null = null;
  private _exam!: IExam;

  // Statics
  protected readonly modalities = ModalityOptions;
  protected readonly faculties = FacultiesOptions;

  protected regions: IRegion[] = [];
  protected provinces: IProvince[] = [];
  protected schoolProvinces: IProvince[] = [];
  protected districts: IDistrict[] = [];
  protected schoolDistricts: IDistrict[] = [];
  protected schools: ISchool[] = [];
  protected isLoading: boolean = false;
  protected filesRequired: IRequirement[] = [];
  protected cost!: ICost;
  protected imgProfile: string = '';
  protected typeProcess: 'create' | 'update' = 'create';

  // Forms
  protected basicForm: FormGroup = new FormGroup({
    names: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    father_lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    mother_lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern('^[0-9]*$')]),
    sex: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern('^[0-9]*$')]),
    civil_status: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_school: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern('^[0-9]*$')]),
    mother_language: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    district: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.required]),
  });
  protected schoolForm: FormGroup = new FormGroup({
    region: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    district: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    education_level: new FormControl('', [Validators.required]),
  });
  protected academicForm: FormGroup = new FormGroup({
    first_option: new FormControl('', [Validators.required]),
    second_option: new FormControl('', [Validators.required]),
    modality: new FormControl('', [Validators.required]),
  });
  protected surveyForm: FormGroup = new FormGroup({
    type_preparation: new FormControl('', [Validators.required]),
    how_know: new FormControl('', [Validators.required]),
    motivation: new FormControl('', [Validators.required]),
    do_work: new FormControl('', [Validators.required]),
    economic_dependent: new FormControl('', [Validators.required]),
    lives_parents: new FormControl('', [Validators.required]),
    siblings: new FormControl('', [Validators.required]),
    lives_currently: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this._payments$.subscribe(data => {
      if (data) {
        this.basicForm.get('dni')?.setValue(data[0].dni);
        this.basicForm.get('dni')?.disable();
      }
    });
    this._subscriptions.add(
      this._exam$.subscribe(data => {
        if (data) {
          this._exam = data;
        }
      })
    );
    this._getRegions();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this.basicForm.reset();
    this.schoolForm.reset();
    this.academicForm.reset();
    this.surveyForm.reset();
    this.regions = [];
    this.provinces = [];
    this.schoolProvinces = [];
    this.districts = [];
    this.schoolDistricts = [];
    this.schools = [];
    this.isLoading = false;
    this.filesRequired = [];
    this.cost = {} as ICost;
    this.imgProfile = '';
    this.typeProcess = 'create';
  }

  private _getRegions(): void {
    this.isLoading = true;

    this._subscriptions.add(
      this._registrationService.getRegions().subscribe({
        next: (res) => {
          if (res.status !== 'success') {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener las regiones'
            });
            return;
          }

          this.regions = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener las regiones, error: ' + err.message
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _getFileRequired(): void {
    this.isLoading = true;
    const id = this.academicForm.get('modality')?.value;
    this._subscriptions.add(
      this._modalitiesService.getRequirementsByModality(id).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener los archivos requeridos'
            });
            return;
          }

          this.filesRequired = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener los archivos requeridos, error: ' + err.message
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _getCosts(): void {
    this.isLoading = true;
    const id = this.academicForm.get('modality')?.value;
    const school = this.schoolForm.get('type')?.value;
    this._subscriptions.add(
      this._modalitiesService.getCostsByModality(id, school).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener los costos de la modalidad'
            });
            return;
          }

          this.cost = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener los costos de la modalidad, error: ' + err.message
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _uploadProfile(): Promise<IResponse> {
    const data = new FormData();
    const mimeType = FileHelper.GetBase64MimeType(this.imgProfile);
    const file = FileHelper.Base64ToImage(this.imgProfile.split(',')[1], 'profile.png', mimeType);
    data.append('file', file);
    return new Promise((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.uploadProfile(data).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          }
        })
      );
    })
  }

  private _uploadFiles(file: IRequirement): Promise<IResponse> {
    this.isLoading = true;
    const data = new FormData();
    if (file.file) {
      const mimeType = FileHelper.GetBase64MimeType(file.file);
      const fileData = FileHelper.Base64ToImage(file.file.split(',')[1], file.file_name || '', mimeType);
      data.append('file', fileData);
    }
    return new Promise<IResponse>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.uploadFile(data).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          }
        })
      );
    });
  }

  private _createSchool(): Promise<IResponse> {
    const school = this.schools.find(school => school.codMod === this.schoolForm.value.name);
    const data: ISchoolDTO = {
      name: school?.nombreCenEdu || '',
      origin_department: this.schoolForm.value.region,
      origin_province: this.schoolForm.value.province,
      origin_district: this.schoolForm.value.district,
      code_school: this.schoolForm.value.name,
      phone_contact: this.basicForm.value.phone_school,
      type: this.schoolForm.value.type,
      level_education: this.schoolForm.value.education_level,
    };

    return new Promise<IResponse>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.registerSchool(data).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          }
        })
      );
    })
  }

  private _createApplicant(school: number, profile: string): Promise<IResponse> {
    const date = new Date();
    const data: IApplicantDTO = {
      name: this.basicForm.value.names,
      paternal_surname: this.basicForm.value.father_lastname,
      maternal_surname: this.basicForm.value.mother_lastname,
      phone: this.basicForm.value.phone,
      url_photo: profile,
      birthdate: this.basicForm.value.birthdate,
      birth_department: this.basicForm.value.region,
      birth_province: this.basicForm.value.province,
      birth_district: this.basicForm.value.district,
      sex: this.basicForm.value.sex,
      DNI: this.basicForm.getRawValue().dni,
      marital_status: this.basicForm.value.civil_status,
      code_applicant: date.getFullYear() + this._exam.id + this.basicForm.getRawValue().dni,
      email: this.basicForm.value.email,
      mother_tongue: this.basicForm.value.mother_language,
      address: this.basicForm.value.address,
      description_applicant: `${this.basicForm.value.names} ${this.basicForm.value.father_lastname} ${this.basicForm.value.mother_lastname}`,
      id_school: school
    };

    return new Promise<IResponse>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.registerApplicant(data).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          }
        })
      );
    })
  }

  private _createAcademic(applicant: number,): Promise<IResponse> {
    const data: IAcademicDTO = {
      first_option: this.academicForm.value.first_option,
      second_option: this.academicForm.value.second_option,
      modality_name: this.academicForm.value.modality,
      application_headquarters: this.surveyForm.value.type_preparation,
      id_applicant: applicant,
      id_payment: this._payment?.cod_recibo || '',
      id_examcall: this._exam.id
    };

    return new Promise<IResponse>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.registerAcademic(data).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          }
        })
      );
    })
  }

  private _createAnswers(data: IAnswer): Promise<IResponse> {
    return new Promise<IResponse>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.registerAnswers(data).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          }
        })
      );
    })
  }

  private _createDocument(file: IRequirement, application: number): Promise<IResponse> {
    const data: IDocumentDTO = {
      document_url: file.url || '',
      name: file.name || '',
      id_application: application.toString()
    };

    return new Promise<IResponse>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.registerDocument(data).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          }
        })
      );
    })
  }

  private _validatePayment(): void {
    this.isLoading = true;
    const data: IPaymentDTO = {
      dni: this.basicForm.getRawValue().dni,
      type_school: this.schoolForm.value.type,
      id_modality: this.academicForm.value.modality
    }
    this._subscriptions.add(
      this._registrationService.validatePayment(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({severity: 'error', summary: 'Error', detail: res.msg});
            return;
          }

          if (!res.data) {
            this._toastService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se encontraron pagos realizados para el DNI ingresado'
            });
            return;
          }

          this._payment = res.data as IPayment;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.error(err);
          this._toastService.add({severity: 'error', summary: 'Error', detail: err.message});
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _exportPDF(application: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.getApplicationReport(application).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          }
        })
      );
    });
  }

  protected getProvinces(ev: any): void {
    const id = ev.id;
    const region = ev.value;
    this.isLoading = true;

    this._subscriptions.add(
      this._registrationService.getProvinces(region).subscribe({
        next: (res) => {
          if (res.status !== 'success') {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener las provincias'
            });
            return;
          }

          if (id === 'school_departmentApplicant') {
            this.schoolProvinces = res.data;
            return;
          }

          this.provinces = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener las provincias, error: ' + err.message
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  protected getDistricts(ev: any): void {
    const id = ev.id;
    const province = ev.value;
    this.isLoading = true;

    this._subscriptions.add(
      this._registrationService.getDistricts(province).subscribe({
        next: (res) => {
          if (res.status !== 'success') {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener los distritos'
            });
            return;
          }

          if (id === 'school_provinceApplicant') {
            this.schoolDistricts = res.data;
            return;
          }
          this.districts = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener los distritos, error: ' + err.message
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  protected getSchools(ev: any): void {
    const district = ev.value;
    this.isLoading = true;

    this._subscriptions.add(
      this._registrationService.getSchools(district).subscribe({
        next: (res) => {
          if (res.status !== 'success') {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener los colegios'
            });
            return;
          }

          this.schools = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener los colegios, error: ' + err.message
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  protected changeModality(): void {
    this._getFileRequired();

    if (this.schoolForm.get('type')?.value) {
      this._validatePayment();
      this._getCosts();
    }
  }

  protected changeSchool(): void {
    if (this.academicForm.get('modality')?.value) {
      this._validatePayment();
      this._getCosts();
    }
  }

  protected processProfile(ev: any): void {
    const file = ev.target.files[0];
    this._subscriptions.add(
      FileHelper.fileReader(file).subscribe({
        next: res => {
          this.imgProfile = res;
        },
        error: (err) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo procesar la imagen'
          });
        }
      })
    );
  }

  protected processFiles(ev: any, id: string): void {
    const file: File = ev.target.files[0];
    const types = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!types.includes(file.type)) {
      this._toastService.add({
        severity: 'error',
        summary: 'Módulo de Registro',
        detail: 'Solo se permite archivos en formato PDF y Imagen'
      });
      return;
    }
    const index = this.filesRequired.findIndex(file => file.id === id);
    this._subscriptions.add(
      FileHelper.fileReader(file).subscribe({
        next: res => {
          this.filesRequired[index].file = res;
          this.filesRequired[index].file_name = file.name;
        },
        error: (err) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo procesar el archivo'
          });
        }
      })
    );
  }

  protected async createPostulation(): Promise<void> {
    if (this.imgProfile === '') {
      this._toastService.add({
        severity: 'warn',
        summary: 'Módulo de Registro',
        detail: 'Debe subir una foto de perfil'
      });
      return;
    }

    if (this.filesRequired.some(file => !file.file)) {
      this._toastService.add({
        severity: 'warn',
        summary: 'Módulo de Registro',
        detail: 'Debe subir todos los documentos requeridos'
      });
      return
    }

    this.isLoading = true;
    try {
      const resSchool = await this._createSchool();
      if (resSchool.error) {
        this._toastService.add({
          severity: 'error',
          summary: 'Módulo de Registro',
          detail: 'No se pudo registrar los datos del colegio'
        });
        this.isLoading = false;
        return;
      }

      const resPhoto = await this._uploadProfile();
      if (resPhoto.error) {
        this._toastService.add({
          severity: 'error',
          summary: 'Módulo de Registro',
          detail: 'No se pudo registrar la foto de perfil'
        });
        this.isLoading = false;
        return;
      }

      const resApplicant = await this._createApplicant(resSchool.data.id, resPhoto.data.url);
      if (resApplicant.error) {
        this._toastService.add({
          severity: 'error',
          summary: 'Módulo de Registro',
          detail: 'No se pudo registrar los datos del postulante'
        });
        this.isLoading = false;
        return;
      }

      const resAcademic = await this._createAcademic(resApplicant.data.id);
      if (resAcademic.error) {
        this._toastService.add({
          severity: 'error',
          summary: 'Módulo de Registro',
          detail: 'No se pudo registrar los datos academicos'
        });
        this.isLoading = false;
        return;
      }

      const answers: IAnswer[] = [
        {
          answer: this.surveyForm.value.type_preparation.toString(),
          id_applicant: resApplicant.data.id,
          question: "Tipo de preparación para su postulación"
        },
        {
          answer: this.surveyForm.value.how_know.toString(),
          id_applicant: resApplicant.data.id,
          question: "¿Cómo se enteró de la fecha de nuestro concurso de admisión?"
        },
        {
          answer: this.surveyForm.value.motivation.toString(),
          id_applicant: resApplicant.data.id,
          question: "¿Cuál fue el principal motivo por el que se animó a postular a la UNAS?"
        },
        {
          answer: this.surveyForm.value.do_work.toString(),
          id_applicant: resApplicant.data.id,
          question: "¿Trabaja?"
        },
        {
          answer: this.surveyForm.value.economic_dependent.toString(),
          id_applicant: resApplicant.data.id,
          question: "Dependencia Económica"
        },
        {
          answer: this.surveyForm.value.lives_parents.toString(),
          id_applicant: resApplicant.data.id,
          question: "¿Viven tus padres?"
        },
        {
          answer: this.surveyForm.value.siblings.toString(),
          id_applicant: resApplicant.data.id,
          question: "¿Cuántos hermanos son?"
        },
        {
          answer: this.surveyForm.value.lives_currently.toString(),
          id_applicant: resApplicant.data.id,
          question: "¿Con quién vives actualmente?"
        },
        {
          answer: this.surveyForm.value.address.toString(),
          id_applicant: resApplicant.data.id,
          question: "Lugar donde vives",
        }
      ];
      for await (let answer of answers) {
        const resAnswers = await this._createAnswers(answer);
        if (resAnswers.error) {
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo registrar las respuestas'
          });
          this.isLoading = false;
          return;
        }
      }

      for await (const file of this.filesRequired) {
        const resFile = await this._uploadFiles(file);
        if (resFile.error) {
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo registrar el documentos Anexo'
          });
          this.isLoading = false;
          return;
        }

        file.url = resFile.data.url;
        const resDocument = await this._createDocument(file, resAcademic.data.id);
        if (resDocument.error) {
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo registrar el documento'
          });
          this.isLoading = false;
          return;
        }
      }

      const file = await this._exportPDF(resAcademic.data.id);
      if (!file) {
        this._toastService.add({
          severity: 'error',
          summary: 'Módulo de Registro',
          detail: 'No se pudo descargar el reporte de la postulación'
        });
        this.isLoading = false;
        return
      }

      FileHelper.DownloadFile(file, `reporte-${resAcademic.data.id}-${this.basicForm.getRawValue().dni}.pdf`);

      this._toastService.add({
        severity: 'success',
        summary: 'Módulo de Registro',
        detail: 'Postulación registrada con éxito'
      });
      this.isLoading = false;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      console.log(e);
      this.isLoading = false;
      this._toastService.add({
        severity: 'error',
        summary: 'Módulo de Registro',
        detail: 'No se pudo registrar la postulación, intente nuevamente'
      });
    }
  }

  protected save(): void {
    if (this.basicForm.invalid || this.schoolForm.invalid || this.academicForm.invalid || this.surveyForm.invalid) {
      this._toastService.add({
        severity: 'warn',
        summary: 'Módulo de Registro',
        detail: 'Complete todos los campos requeridos'
      });
      this.basicForm.markAllAsTouched();
      this.schoolForm.markAllAsTouched();
      this.academicForm.markAllAsTouched();
      this.surveyForm.markAllAsTouched();
      return;
    }

    if (this.typeProcess === 'create') {
      this.createPostulation();
    } else {

    }

  }

}
