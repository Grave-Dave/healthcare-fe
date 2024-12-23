import {RegisterForm, RegisterFormError} from "../Register/types.ts";

export interface UserAccountReducerState {
    userDataForm: RegisterForm
    userDataFormError: RegisterFormError
    isLoading: boolean
}
