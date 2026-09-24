export interface RegisterPageReducerState {
    registerForm: RegisterForm
    registerFormError: RegisterFormError
    isStatuteAccepted: boolean
    isLoading: boolean
}

export interface RegisterForm {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    password_confirmation: string
}

export interface RegisterFormError {
    firstName: boolean,
    lastName: boolean,
    email: boolean,
    phone: boolean,
    password: boolean,
    password_confirmation: boolean
}

export type ShowPassword = Record<keyof Pick<RegisterForm, 'password' | 'password_confirmation'>, boolean>;

