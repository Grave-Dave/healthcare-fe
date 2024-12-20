import {LoginForm, LoginFormError} from "./types.ts";

export enum LOGIN_FORM_KEYS {
    EMAIL= 'email',
    PASSWORD= 'password',
}

export const DEFAULT_LOGIN_FORM: LoginForm = {
    email: '',
    password: ''
}

export const DEFAULT_LOGIN_FORM_ERROR: LoginFormError = {
    email: false,
    password: false
}
