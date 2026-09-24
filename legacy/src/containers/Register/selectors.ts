import {REDUCER_KEY} from "./reducer.ts";
import {RootState} from "../../main.tsx";

export const getRegisterForm = (state: RootState) => state[REDUCER_KEY].registerForm;
export const getRegisterFormError = (state: RootState) => state[REDUCER_KEY].registerFormError;
export const getIsStatuteAccepted = (state: RootState) => state[REDUCER_KEY].isStatuteAccepted;
export const getIsLoading = (state: RootState) => state[REDUCER_KEY].isLoading;

export default {
    getRegisterForm,
    getRegisterFormError,
    getIsStatuteAccepted,
    getIsLoading
}
