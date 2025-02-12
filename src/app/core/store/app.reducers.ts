import {ActionReducerMap} from "@ngrx/store";
import {AuthReducer, AuthState} from "./reducers/auth.reducer";
import {PaymentReducer, PaymentState} from "./reducers/payment.reducer";
import {ExamReducer, ExamState} from "./reducers/exam.reducer";

export interface AppState {
  auth: AuthState;
  payment: PaymentState;
  exam: ExamState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  payment: PaymentReducer,
  exam: ExamReducer
};
