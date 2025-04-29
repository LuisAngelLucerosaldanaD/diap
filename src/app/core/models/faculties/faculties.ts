export interface IFaculties {
  id: number;
  photo_url: string;
  name: string;
  url_web_address: string;
  professional_title: string;
  academic_degree: string;
}

export interface IUpdateFaculty {
  name: string;
  url_web_address: string;
  professional_title: string;
  academic_degree: string;
  photo_path?: string;
}
