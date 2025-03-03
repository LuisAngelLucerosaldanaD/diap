import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {IModality} from "../models/admin/postulation";

type PostState = {
  typeSchool: string;
  modality: IModality | null;
  dni: string;
  onboarding: boolean;
};

const initialState: PostState = {
  typeSchool: '',
  modality: null,
  dni: '',
  onboarding: false
};

export const PostStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store) => ({
    setTypeSchool(typeSchool: string) {
      patchState(store, (state) => ({...state, typeSchool}));
    },
    setModality(modality: IModality) {
      patchState(store, (state) => ({...state, modality}));
    },
    setDni(dni: string) {
      patchState(store, (state) => ({...state, dni}));
    },
    reset() {
      patchState(store, () => initialState);
    },
    setPostulation(postulation: PostState) {
      patchState(store, () => postulation);
    },
    setOnboarding(onboarding: boolean) {
      patchState(store, (state) => ({...state, onboarding}));
    }
  }))
);
