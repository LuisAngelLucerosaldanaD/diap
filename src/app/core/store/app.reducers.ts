import {ActionReducerMap} from "@ngrx/store";
import {AuthReducer, AuthState} from "./reducers/auth.reducer";

export interface AppState {
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer
};
