export interface IMode {
  name: string;
  value: string;
  requirements: IRequirement[];
}

export interface IRequirement {
  id: string;
  name: string;
  description: string;
  guide: string | null;
  url_template: string | null;
  id_modality: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}
