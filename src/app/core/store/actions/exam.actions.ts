import {createAction, props} from "@ngrx/store";
import {IExam} from "../../models/admin/exams";

export const setExam = createAction('[Exam] Set Exam', props<{ exam: IExam }>());
