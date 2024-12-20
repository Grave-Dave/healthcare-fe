import {RegisterForm, RegisterFormError} from "./types.ts";

export enum REGISTER_FORM_KEYS {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    EMAIL = 'email',
    PHONE = 'phone',
    PASSWORD = 'password',
    CONFIRMATION = 'password_confirmation',
}

export const EMAIL_REGEX = /^[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/;

export const DEFAULT_REGISTER_FORM: RegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
}

export const DEFAULT_REGISTER_FORM_ERROR: RegisterFormError = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    password_confirmation: false
}
