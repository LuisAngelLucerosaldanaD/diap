
export interface IOption {
  name: string;
  value: any;
  type: 1 | 2;
}

export interface IPaymentDTO {
  dni: string;
  type_school: string;
  id_modality: number;
  id_examcall: number;
}

export interface IPayment {
  person_id: number;
  dni: string;
  nombres: string;
  cantidad: number;
  precio_unit: string;
  importe_pagado: string;
  is_from_voucher: number;
  num_voucher: string;
  fecha_pago: string;
  cod_recibo: string;
  estado_recibo: string;
  codpar: string;
  codconcepto: string;
  concepto_pagado: string;
  detalle_id: number;
  recibo_id: number;
  dependency_id: number;
  dependencia: string;
  siglas_dependencia: string;
  origen_id: number;
  cod_origen: string;
  nombre_origen: string;
}

export interface ICost {
  name: string;
  description: string;
  price: number;
}

export interface ISchoolDTO {
  name: string;
  origin_department: string;
  origin_province: string;
  origin_district: string;
  code_school: string;
  phone_contact: string;
  type: string;
  level_education: string;
  is_nacional: boolean;
}


export interface IApplicantDTO {
  name: string;
  paternal_surname: string;
  maternal_surname: string;
  phone: string;
  url_photo: string;
  birthdate: string;
  birth_department: string;
  birth_province: string;
  birth_district: string;
  sex: string;
  DNI: string;
  marital_status: string;
  code_applicant: string;
  email: string;
  mother_tongue: string;
  address: string;
  description_applicant: string;
  id_school: number;
}

export interface IAcademicDTO {
  first_option: string;
  second_option: string;
  modality_name: string;
  application_headquarters: string;
  id_applicant: number;
  id_payment: string;
  id_examcall: number;
}

export interface IAnswer {
  question: string;
  answer: string;
  id_applicant: number;
}

export interface IDocumentDTO {
  name: string;
  document_url: string;
  id_application: string;
}

export interface IAnnexe {
  id: number;
  name: string;
  document_url: string;
  id_application: number;
  created_at: string;
  updated_at: string;
}
