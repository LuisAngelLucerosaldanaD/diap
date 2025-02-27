import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { IPayment } from "../models/registration/registration";

type PaymentState = {
    payment: IPayment | null;
    payments: IPayment[];
};

const initialState: PaymentState = {
    payment: null,
    payments: []
};

export const PaymentStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setPayment(payment: IPayment) {
            patchState(store, (state) => ({...state, payment: payment}));
        },
        setPayments(payments: IPayment[]) {
            patchState(store, (state) => ({...state, payments: payments}));
        }
    }))
);