import {ActionReducerMap} from "@ngrx/store";
import {PaymentReducer, PaymentState} from "./reducers/payment.reducer";
import {ExamReducer, ExamState} from "./reducers/exam.reducer";

export interface AppState {
  payment: PaymentState;
  exam: ExamState;
}

export const appReducers: ActionReducerMap<AppState> = {
  payment: PaymentReducer,
  exam: ExamReducer
};
