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

export const TITLE = 'Katarzyna Trzeciakiewicz Gabinet Psychoterapii | Logowanie'
export const DESCRIPTION = "Zaloguj się do swojego konta i zarządzaj swoimi wizytami oraz dostępem do terapii u Katarzyny Trzeciakiewicz, psychoterapeuty psychodynamicznego."
export const KEYWORDS = "logowanie, dostęp do konta, psychoterapia Wrocław, Katarzyna Trzeciakiewicz, zarządzanie wizytami, dostęp do terapii"
