export interface IRequirement {
  id: string;
  name: string;
  description_guide: string;
  url_guide: string | null;
  url_template: string | null;
  id_modality: number;
  file?: string;
  file_name?: string;
  url?: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IRequirementDTO {
  name: string;
  description_guide: string;
  url_guide: string;
  url_template: string;
  id_modality: number;
}

