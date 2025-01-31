export interface IExam {
  contact: string;
  created_at: string;
  description: string;
  end_date: string;
  exam_date: string;
  id: number;
  id_examtype: number;
  name: string;
  start_date: string;
  updated_at: string;
}

export interface ICreateExam {
  name: string;
  description: string;
  contact: string;
  start_date: string;
  end_date: string;
  exam_date: string;
  id_examtype: number;
}

export interface IUpdateExam {
  id: number;
  name: string;
  description: string;
  contact: string;
  start_date: string;
  end_date: string;
  exam_date: string;
  id_examtype: number;
}
