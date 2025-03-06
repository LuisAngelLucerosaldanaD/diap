import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {IMenuItem} from "../models/ui/menu";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
import {AUTH_MENU, HOME_MENU} from "../utils/constants/constants";
import {IModality} from "../models/admin/postulation";

type AppState = {
  menuItems: IMenuItem[];
  menuIsCompact: boolean;
  isMobileDevice: boolean;
  modality: IModality | null;
};

const initialState: AppState = {
  menuItems: [],
  menuIsCompact: false,
  isMobileDevice: false,
  modality: null,
};

export const AppStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, authService = inject(AuthService)) => ({
    setMenuItems(items: IMenuItem[]) {
      patchState(store, (state) => ({...state, menuItems: items}));
    },
    toggleMenu() {
      patchState(store, (state: AppState) => ({...state, menuIsCompact: !state.menuIsCompact}));
    },
    setIsMobileDevice(isMobileDevice: boolean) {
      patchState(store, (state) => ({...state, isMobileDevice}));
    },
    setAppState(data: AppState) {
      patchState(store, (state) => ({...state, ...data}));
    },
    setLogout() {
      patchState(store, (state) => ({...state, ...initialState}));
    },
    setAuthMenu() {
      const items = AUTH_MENU.filter((item) => item.roles.includes(authService.getRole()))
      patchState(store, (state) => ({...state, menuItems: items}));
    },
    setHomeMenu() {
      patchState(store, (state) => ({...state, menuItems: HOME_MENU}));
    },
    setModality(modality: IModality | null) {
      patchState(store, (state) => ({...state, modality}));
    },
  }))
);
