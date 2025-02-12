import {createAction, props} from "@ngrx/store";
import {IPayment} from "../../models/registration/registration";

export const setPayment = createAction('[Payment] Set Payment', props<{ payment: IPayment }>());
export const setPayments = createAction('[Payment] Set Payments', props<{ payments: IPayment[] }>());
