import {REDUCER_KEY} from "./reducer.ts";

export const getRegisterForm = (state: any) => state.reducers[REDUCER_KEY].registerForm;
export const getRegisterFormError = (state: any) => state.reducers[REDUCER_KEY].registerFormError;
export const getIsStatuteAccepted = (state: any) => state.reducers[REDUCER_KEY].isStatuteAccepted;
export const getIsLoading = (state: any) => state.reducers[REDUCER_KEY].isLoading;

export default {
    getRegisterForm,
    getRegisterFormError,
    getIsStatuteAccepted,
    getIsLoading
}
