import {REDUCER_KEY} from "./reducer.ts";
import {RootState} from "../../main.tsx";

export const getUserDataForm = (state: RootState) => state[REDUCER_KEY].userDataForm;
export const getUserDataFormError = (state: RootState) => state[REDUCER_KEY].userDataFormError;
export const getIsLoading = (state: RootState) => state[REDUCER_KEY].isLoading;

export default {
    getUserDataForm,
    getUserDataFormError,
    getIsLoading
}
