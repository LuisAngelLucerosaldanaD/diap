import {createAction, props} from "@ngrx/store";
import {AuthState} from "../reducers/auth.reducer";

export const setAuthState = createAction('[Auth] Set Auth State', props<{ auth: AuthState }>());
