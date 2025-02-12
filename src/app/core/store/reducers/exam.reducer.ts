import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {IExam} from "../../models/admin/exams";
import {setExam} from "../actions/exam.actions";

export interface ExamState {
  exam: IExam | null;
}

const InitialState: ExamState = {
  exam: null,
}

const examReducer = createReducer(
  InitialState,
  on(setExam, (state, {exam}) => ({
    ...state,
    exam
  })),
);

export function ExamReducer(state: ExamState | undefined, action: any) {
  return examReducer(state, action);
}


export const selectExamState = createFeatureSelector<ExamState>('exam');

export const selectExam = createSelector(
  selectExamState,
  (state: ExamState) => state.exam
);

