export interface IRegion {
  idRegion: string;
  nombreRegion: string;
  pointX: string;
  pointY: string;
  zoom: number;
  provinces: IProvince[];
  created_at: string;
  updated_at: string;
}

export interface IProvince {
  idProvincia: string;
  nombreProvincia: string;
  pointX: string;
  pointY: string;
  zoom: number;
  districts: IDistrict[];
  created_at: string;
  updated_at: string;
}

export interface IDistrict {
  idDistrito: string;
  nombreDistrito: string;
  created_at: string;
  updated_at: string;
}

export interface ISchool {
  codMod: string;
  nombreCenEdu: string;
  cenPob: string;
  dirCen: string;
  director: string;
  dis_crecer: string;
  dis_juntos: string;
  cenEdu: null,
  nivelModalidad: string;
  idNivelModalidad: string;
  idDistrito: string;
  created_at: string;
  updated_at: string;
}
