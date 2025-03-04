export interface ISearchPostulation {
  id_examcall: number;
  search: string;
}

export interface IPostulation {
  id: number;
  first_option: string;
  second_option: string;
  modality_name: string;
  application_headquarters: string;
  id_applicant: number;
  applicant: IApplicant;
  id_payment: string;
  id_examcall: number;
  created_at: string;
  updated_at: string;
}

export interface IApplicant {
  id: number;
  name: string;
  paternal_surname: string;
  maternal_surname: string;
  phone: string;
  birthdate: string;
  url_photo: string;
  sex: string;
  DNI: string;
  marital_status: string;
  code_applicant: string;
  email: string;
  mother_tongue: string;
  birth_department: string;
  birth_province: string;
  birth_district: string;
  address: string;
  description_applicant: string;
  id_school: number;
  is_verified: boolean;
  date_verified: string;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}

export interface IModality {
  id: number;
  description: string;
  id_examtype: number;
  name: string;
  private_school_code_pay: number;
  private_school_price: number;
  state_school_code_pay: number;
  state_school_price: number;
  updated_at: string;
  created_at: string;
}

export interface IModalityDTO {
  description: string;
  id_examtype: number;
  name: string;
  private_school_code_pay: number;
  private_school_price: number;
  state_school_code_pay: number;
  state_school_price: number;
}
