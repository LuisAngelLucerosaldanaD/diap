import {IDataSession} from "../../models/auth/auth";
import {createReducer, on} from "@ngrx/store";
import {setAuthState} from "../actions/auth.actions";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  data_session: IDataSession | null;
}

const InitialState: AuthState = {
  data_session: null,
  isAuthenticated: false,
  token: null
}

const authReducer = createReducer(InitialState, on(setAuthState, (state, {auth}) => ({
  ...state,
  ...auth
})));

export function AuthReducer(state: AuthState | undefined, action: any) {
  return authReducer(state, action);
}
