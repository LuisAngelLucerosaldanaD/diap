import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { IAuth } from "../models/auth/auth";

type AuthState = {
    token: string;
    isAuth: boolean;
    role: number;
    user: string;
};

const initialState: AuthState = {
    token: '',
    isAuth: false,
    role: -1,
    user: ''
};

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        updateSession(data: IAuth): void {
            patchState(store, (state) => ({ ...state, ...data}));
        },
        logout(): void {
            patchState(store, (state) => ({ ...state, ...initialState}));
        }
    }))
);