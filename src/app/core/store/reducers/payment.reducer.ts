import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {IPayment} from "../../models/registration/registration";
import {setPayment, setPayments} from "../actions/payment.actions";

export interface PaymentState {
  payment: IPayment | null;
  payments: IPayment[];
}

const InitialState: PaymentState = {
  payment: null,
  payments: []
}

const paymentReducer = createReducer(
  InitialState,
  on(setPayment, (state, {payment}) => ({
    ...state,
    payment
  })),
  on(setPayments, (state, {payments}) => ({
    ...state,
    payments
  }))
);

export function PaymentReducer(state: PaymentState | undefined, action: any) {
  return paymentReducer(state, action);
}


export const selectPaymentState = createFeatureSelector<PaymentState>('payment');

export const selectPayment = createSelector(
  selectPaymentState,
  (state: PaymentState) => state.payment
);

export const selectPayments = createSelector(
  selectPaymentState,
  (state: PaymentState) => state.payments
);
