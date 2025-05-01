import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, signal} from '@angular/core';
import {Subscription} from "rxjs";
import {RegistrationService} from "../../services/admin/registration.service";
import {MessageService} from "primeng/api";
import {IDistrict, IProvince, IRegion, ISchool} from "../../models/registration/address";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {BlockUiComponent} from "../block-ui/block-ui.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FacultiesOptions} from "../../utils/constants/constants";
import {
  IAcademicDTO, IAnnexe, IAnswer,
  IApplicantDTO,
  ICost, IDocumentDTO, IOption,
  IPayment, IPaymentDTO,
  ISchoolDTO
} from "../../models/registration/registration";
import {NameInpDirective} from "../../directives/name-inp.directive";
import {NumbersInpDirective} from "../../directives/numbers-inp.directive";
import {ModalitiesService} from "../../services/home/modalities.service";
import {FileHelper} from "../../utils/file/file";
import {AsyncPipe, NgIf} from "@angular/common";
import {IResponse} from "../../models/response";
import {IExam} from "../../models/admin/exams";
import {IModality, IPostulation} from "../../models/admin/postulation";
import {SecureImagePipe} from "../../pipes/secure-image.pipe";
import {SafePipePipe} from "../../pipes/safe-pipe.pipe";
import {ModeForm} from '../../types/forms';
import {ExamStore} from "../../store/exam.store";
import {PostStore} from "../../store/post.store";
import {IRequirement} from "../../models/admin/modality";
import {AuthStore} from "../../store/auth.store";

@Component({
  selector: 'app-form-registration',
  standalone: true,
  imports: [
    ToastModule,
    BlockUiComponent,
    ReactiveFormsModule,
    NameInpDirective,
    NumbersInpDirective,
    NgIf,
    SecureImagePipe,
    AsyncPipe,
    SafePipePipe,
  ],
  templateUrl: './form-registration.component.html',
  styleUrl: './form-registration.component.scss',
  providers: [MessageService]
})
export class FormRegistrationComponent implements OnInit, OnDestroy {
  @Input() postulation!: IPostulation;
  @Input() mode: ModeForm = 'create';
  @Input() module: 'post' | 'regis' = 'regis';
  @Output() finish: EventEmitter<void> = new EventEmitter<void>();

  // Services
  private readonly _subscriptions: Subscription = new Subscription();
  private readonly _registrationService: RegistrationService = inject(RegistrationService);
  private readonly _modalitiesService: ModalitiesService = inject(ModalitiesService);
  private readonly _toastService: MessageService = inject(MessageService);

  // Stores
  private readonly _examStore = inject(ExamStore);
  private readonly _postStore = inject(PostStore);
  private readonly _authStore = inject(AuthStore);

  private _payment: IPayment | null = null;
  private _exam!: IExam;
  private school = signal(-1);
  private answers = signal<any[]>([]);
  private timeout: any = null;

  // Readonly Properties
  protected readonly faculties = FacultiesOptions;

  protected facultiesSecond: IOption[] = [];
  protected modalities: IModality[] = [];
  protected regions: IRegion[] = [];
  protected provinces: IProvince[] = [];
  protected schoolProvinces: IProvince[] = [];
  protected districts: IDistrict[] = [];
  protected schoolDistricts: IDistrict[] = [];
  protected schools: ISchool[] = [];
  protected isLoading: boolean = false;
  protected filesRequired: IRequirement[] = [];
  protected annexes: IAnnexe[] = [];
  protected cost!: ICost;
  protected imgProfile: string = '';


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
    mother_language: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    district: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.required]),
    phone_school: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern('^[0-9]*$')]),
  });
  protected schoolForm: FormGroup = new FormGroup({
    region: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    district: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    education_level: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required])
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

    if (!this._examStore.exam()) {
      this._toastService.add({severity: 'warn', summary: 'Módulo de Registro', detail: 'Debe seleccionar un examen'});

      this.timeout = setTimeout(() => {
        this.finish.emit();
        this._postStore.setOnboarding(false);
      }, 1000);
      return;
    }

    if (this._postStore.dni()) {
      this.basicForm.get('dni')?.setValue(this._postStore.dni());
      this.basicForm.get('dni')?.disable();
    }

    if (this._postStore.typeSchool()) {
      this.schoolForm.get('type')?.setValue(this._postStore.typeSchool());
      this.schoolForm.get('type')?.disable();
    }
    if (this._examStore.exam()) {
      this._exam = this._examStore.exam() as IExam;
      this._getModalities();
    }

    if (this._postStore.modality()) {
      this.academicForm.get('modality')?.setValue(this._postStore.modality()?.id);
      this.academicForm.get('modality')?.disable();
      this._validatePayment();
      this._getFileRequired();
      this._getCosts();
    }

    this._getRegions();
    if (this.mode === 'update' || this.mode === 'show') {
      this._loadData();
      this._getSchoolData();
      this._getAnnexes();
      this._getAnswers();
    }
    if (this.mode === 'show') this._disableForms();
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
    this.mode = 'create';
    if (this.timeout) clearTimeout(this.timeout);
  }

  private _loadData(): void {
    this.basicForm.patchValue({
      names: this.postulation.applicant.name,
      father_lastname: this.postulation.applicant.paternal_surname,
      mother_lastname: this.postulation.applicant.maternal_surname,
      phone: this.postulation.applicant.phone,
      sex: this.postulation.applicant.sex,
      dni: this.postulation.applicant.DNI,
      civil_status: this.postulation.applicant.marital_status,
      email: this.postulation.applicant.email,
      mother_language: this.postulation.applicant.mother_tongue,
      birthdate: this.postulation.applicant.birthdate,
      region: this.postulation.applicant.birth_department,
      province: this.postulation.applicant.birth_province,
      district: this.postulation.applicant.birth_district,
      address: this.postulation.applicant.address,
    });

    this.imgProfile = this.postulation.applicant.url_photo;

    const first = this.faculties.find(faculty => faculty.value === this.postulation.first_option);
    this.facultiesSecond = this.faculties.filter(faculty => faculty.type === first?.type);

    this.academicForm.patchValue({
      first_option: this.postulation.first_option,
      second_option: this.postulation.second_option,
      modality: this.postulation.modality_name,
    });

    this.academicForm.disable();
    this.basicForm.get('dni')?.disable();
  }

  private getExamId(): number {
    if (this._exam && this._exam.id) return this._exam.id;
    const examSession = sessionStorage.getItem('exam');
    if (!examSession) return 0;
    const exam = JSON.parse(examSession);
    return exam.id;
  }

  private _disableForms(): void {
    this.basicForm.disable();
    this.schoolForm.disable();
    this.academicForm.disable();
    this.surveyForm.disable();
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
          if (this.mode === 'show' || this.mode === 'update') {
            const region = this.regions.find(region => region.idRegion === this.postulation.applicant.birth_department);
            this.basicForm.get('region')?.setValue(region?.idRegion);
            this.getProvinces({id: 'applicant', value: region?.idRegion});
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener las regiones, error: ' + err.error.msg
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

          if (this.mode === 'update') {
            res.data.forEach((file: IRequirement) => {
              const annex = this.annexes.find(annex => annex.name === file.name);
              file.url = annex?.document_url || '';
              file.file_name = annex?.document_url.split('_')[1].replaceAll('%20', '_') || '';
            });
          }
          this.filesRequired = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener los archivos requeridos, error: ' + err.error.msg
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
            detail: 'No se pudo obtener los costos de la modalidad, error: ' + err.error.msg
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

  private _saveSchool(): Promise<IResponse> {
    const school = this.schools.find(school => school.codMod === this.schoolForm.value.name);
    const form = this.schoolForm.getRawValue();
    const data: ISchoolDTO = {
      name: school?.nombreCenEdu || '-',
      origin_department: form.region,
      origin_province: form.province,
      origin_district: form.district,
      code_school: form.name,
      phone_contact: this.basicForm.get('phone_school')?.value || '-',
      type: form.type,
      level_education: form.education_level,
      is_nacional: form.nationality === 'Peruano',
      id_examcall: this._exam.id,
      dni_applicant: this.basicForm.getRawValue().dni
    };
    if (this.mode === 'create') {
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
      });
    }

    return new Promise<IResponse>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.updateSchool(this.school(), data).subscribe({
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

  private _saveApplicant(school: number, profile: string): Promise<IResponse> {
    const date = new Date();
    const form = this.basicForm.getRawValue();

    const data: IApplicantDTO = {
      name: form.names,
      paternal_surname: form.father_lastname,
      maternal_surname: form.mother_lastname,
      phone: form.phone,
      url_photo: profile,
      birthdate: form.birthdate,
      birth_department: form.region,
      birth_province: form.province,
      birth_district: form.district,
      sex: form.sex,
      DNI: this.basicForm.getRawValue().dni,
      marital_status: form.civil_status,
      code_applicant: date.getFullYear() + (this._exam.id).toString() + (this.basicForm.getRawValue().dni).toString(),
      email: form.email,
      mother_tongue: form.mother_language,
      address: form.address,
      description_applicant: `${form.names} ${form.father_lastname} ${form.mother_lastname}`,
      id_school: school
    };

    if (this.mode === 'create') {
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
      });
    }

    return new Promise<IResponse>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.updateApplicant(this.postulation.applicant.id, data).subscribe({
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

  private _saveAcademic(applicant: number): Promise<IResponse> {
    const form = this.academicForm.getRawValue();
    const data: IAcademicDTO = {
      first_option: form.first_option,
      second_option: form.second_option,
      modality_name: form.modality,
      application_headquarters: this.surveyForm.value.type_preparation,
      id_applicant: this.mode === 'create' ? applicant : this.postulation.applicant.id,
      id_payment: this._payment?.cod_recibo || 'Registrado por administrador, no consigna pago en la pasarela de pagos UNAS',
      id_examcall: this.getExamId()
    };

    if (this.mode === 'create') {
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
      });
    }

    return new Promise<IResponse>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.updateAcademic(this.postulation.applicant.id, data).subscribe({
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

  private _saveAnswers(data: IAnswer): Promise<IResponse> {
    if (this.mode === 'create') {
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
      });
    }

    return new Promise<IResponse>((resolve, reject) => {
      const answer = this.answers().find(ans => ans.question === data.question);
      this._subscriptions.add(
        this._registrationService.updateAnswer(answer.id, data).subscribe({
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

  private _saveDocument(file: IRequirement, application: number): Promise<IResponse> {
    const data: IDocumentDTO = {
      document_url: file.url || '',
      name: file.name || '',
      id_application: this.mode === 'create' ? application.toString() : this.postulation.id.toString()
    };

    if (this.mode === 'create') {
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
      });
    }

    return new Promise<IResponse>((resolve, reject) => {
      this._subscriptions.add(
        this._registrationService.updateDocument(this.postulation.id, data).subscribe({
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

  private _validatePayment(): void {
    this.isLoading = true;
    const data: IPaymentDTO = {
      dni: this.basicForm.getRawValue().dni,
      type_school: this.schoolForm.value.type,
      id_modality: this.academicForm.value.modality,
      id_examcall: this.getExamId()
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
          if (err.status === 404) {
            this._toastService.add({
              severity: 'warn',
              summary: 'Validación de Pago',
              detail: "El postulante no ha realizado el pago correspondiente o realizó el pago por caja",
              life: 5000
            });
            return;
          }
          this._toastService.add({severity: 'error', summary: 'Validación de Pago', detail: err.error.msg});
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

  private _getSchoolData(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._registrationService.getSchoolsData(this.postulation.applicant.id_school).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener los colegios'
            });
            return;
          }
          this.school.set(res.data.id);
          this.schoolForm.patchValue({
            region: res.data.origin_department,
            province: res.data.origin_province,
            district: res.data.origin_district,
            name: res.data.code_school,
            type: res.data.type,
            education_level: res.data.level_education,
            nationality: res.data.is_nacional ? 'Peruano' : 'Extranjero'
          });

          this.basicForm.patchValue({phone_school: res.data.phone_contact});
          this.schoolForm.get('type')?.disable();
          if (res.data.origin_department !== '-') {
            this.getProvinces({id: 'school_departmentApplicant', value: res.data.origin_department});
          }

          if (this.mode === 'update') {
            // this._validatePayment();
            this._getFileRequired();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener los colegios, error: ' + err.error.msg
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _getAnnexes(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._registrationService.getAnnexes(this.postulation.id).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener los documentos anexos'
            });
            return;
          }

          this.annexes = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener los documentos anexos, error: ' + err.error.msg
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _getAnswers(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._registrationService.getAnswers(this.postulation.applicant.id).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener las respuestas'
            });
            return;
          }

          this.answers.set(res.data);
          this.surveyForm.patchValue({
            type_preparation: res.data[0].answer,
            how_know: res.data[1].answer,
            motivation: res.data[2].answer,
            do_work: res.data[3].answer,
            economic_dependent: res.data[4].answer,
            lives_parents: res.data[5].answer,
            siblings: res.data[6].answer,
            lives_currently: res.data[7].answer,
            address: res.data[8].answer,
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener las respuestas, error: ' + err.error.msg
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
  }

  private _getModalities(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._modalitiesService.getModalities(this._exam.id_examtype).subscribe({
        next: (res) => {
          if (res.error) {
            this._toastService.add({
              severity: 'error',
              summary: 'Módulo de Registro',
              detail: 'No se pudo obtener las modalidades'
            });
            return;
          }

          this.modalities = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener las modalidades, error: ' + err.error.msg
          });
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    );
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
            if ((this.mode === 'show' || this.mode === 'update') && this.schoolForm.get('province')?.value !== '-' && this.schoolForm.get('province')?.value !== '') {
              const province = res.data.find(region => region.idProvincia === this.schoolForm.get('province')?.value);
              this.getDistricts({id: 'school_provinceApplicant', value: province?.idProvincia});
            }
            return;
          }

          if (this.mode === 'show' || this.mode === 'update') {
            const province = res.data.find(region => region.idProvincia === this.postulation.applicant.birth_province);
            this.basicForm.get('province')?.setValue(province?.idProvincia);
            this.getDistricts({id: 'applicant', value: province?.idProvincia});
          }
          this.provinces = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener las provincias, error: ' + err.error.msg
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
            if ((this.mode === 'show' || this.mode === 'update') && this.schoolForm.get('district')?.value !== '-' && this.schoolForm.get('district')?.value !== '') {
              this.getSchools({value: this.schoolForm.get('district')?.value});
            }
            return;
          }
          this.districts = res.data;

          if (this.mode === 'show' || this.mode === 'update') {
            const district = res.data.find(region => region.idDistrito === this.postulation.applicant.birth_district);
            this.basicForm.get('district')?.setValue(district?.idDistrito);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._toastService.add({
            severity: 'error',
            summary: 'Módulo de Registro',
            detail: 'No se pudo obtener los distritos, error: ' + err.error.msg
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
            detail: 'No se pudo obtener los colegios, error: ' + err.error.msg
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

  protected changeFaculty(): void {
    this.facultiesSecond = [];
    const fac = this.faculties.find(faculty => faculty.value === this.academicForm.get('first_option')?.value);
    if (!fac) return;
    this.facultiesSecond = this.faculties.filter(faculty => faculty.type === fac.type);
    this.facultiesSecond = this.facultiesSecond.filter(faculty => faculty.value !== this.academicForm.get('first_option')?.value);
    this.academicForm.get('second_option')?.setValue('');
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
            detail: err.error.msg
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
            detail: err.error.msg
          });
        }
      })
    );
  }

  protected cancel(): void {
    this._postStore.setDni('');
    this._postStore.setTypeSchool('');
    this._postStore.setOnboarding(false);
  }

  protected async createPostulation(): Promise<void> {
    if (this.mode === 'create') {
      if (this.imgProfile === '') {
        this._toastService.add({
          severity: 'warn',
          summary: 'Módulo de Registro',
          detail: 'Debe subir una foto de perfil'
        });
        return;
      }
    }
    if (this.mode === 'create' && (this._authStore.role() !== 1 && this._authStore.role() !== 2)) {
      if (this.filesRequired.some(file => !file.file)) {
        this._toastService.add({
          severity: 'warn',
          summary: 'Módulo de Registro',
          detail: 'Debe subir todos los documentos requeridos'
        });
        return
      }
    }

    this.isLoading = true;
    try {
      const resSchool = await this._saveSchool();
      if (resSchool.error) {
        this._toastService.add({
          severity: 'error',
          summary: 'Módulo de Registro',
          detail: 'No se pudo registrar los datos del colegio'
        });
        this.isLoading = false;
        return;
      }

      let picture = this.imgProfile;
      if (!this.imgProfile.startsWith('https')) {
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
        picture = resPhoto.data.url;
      }

      const resApplicant = await this._saveApplicant(resSchool.data.id, picture);
      if (resApplicant.error) {
        this._toastService.add({
          severity: 'error',
          summary: 'Módulo de Registro',
          detail: 'No se pudo registrar los datos del postulante'
        });
        this.isLoading = false;
        return;
      }

      const resAcademic = await this._saveAcademic(resApplicant.data.id);
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
        const resAnswers = await this._saveAnswers(answer);
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
        if (!file.file) continue;
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
        const resDocument = await this._saveDocument(file, resAcademic.data.id);
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

      this.timeout = setTimeout(() => {
        if (this.module === 'post') return this.finish.emit();
        this._postStore.setOnboarding(false);
      }, 1000);
    } catch (e: any) {
      console.error(e);
      this.isLoading = false;
      this._toastService.add({
        severity: 'error',
        summary: 'Módulo de Registro',
        detail: e.error ? e.error.msg : 'No se pudo crear la postulación, error: ' + e.message
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

    this.createPostulation();
  }

  get nationality(): FormControl {
    return this.schoolForm.get('nationality') as FormControl;
  }

  protected changeNationality(): void {
    if (this.nationality.value === 'Extranjero') {
      this.schoolForm.get('region')?.setValue('-');
      this.schoolForm.get('region')?.clearValidators();
      this.schoolForm.get('region')?.updateValueAndValidity();

      this.schoolForm.get('province')?.setValue('-');
      this.schoolForm.get('province')?.clearValidators();
      this.schoolForm.get('province')?.updateValueAndValidity();

      this.schoolForm.get('district')?.setValue('-');
      this.schoolForm.get('district')?.clearValidators();
      this.schoolForm.get('district')?.updateValueAndValidity();

      this.schoolForm.get('name')?.setValue('-');
      this.schoolForm.get('name')?.clearValidators();
      this.schoolForm.get('name')?.updateValueAndValidity();

      return;
    }

    this.schoolForm.get('region')?.setValue('');
    this.schoolForm.get('region')?.setValidators(Validators.required);
    this.schoolForm.get('region')?.updateValueAndValidity();

    this.schoolForm.get('province')?.setValue('');
    this.schoolForm.get('province')?.setValidators(Validators.required);
    this.schoolForm.get('province')?.updateValueAndValidity();

    this.schoolForm.get('district')?.setValue('');
    this.schoolForm.get('district')?.setValidators(Validators.required);
    this.schoolForm.get('district')?.updateValueAndValidity();

    this.schoolForm.get('name')?.setValue('');
    this.schoolForm.get('name')?.setValidators(Validators.required);
    this.schoolForm.get('name')?.updateValueAndValidity();
  }

}
