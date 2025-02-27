import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { IExam } from "../models/admin/exams";

type ExamState = {
    exam: IExam | null;
};

const initialState: ExamState = {
    exam: null
};

export const ExamStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setExam(exam: IExam) {
            patchState(store, (state) => ({...state, exam: exam}));
        }
    }))
);