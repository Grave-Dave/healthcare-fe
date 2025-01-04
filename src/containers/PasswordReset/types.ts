export interface PasswordResetPageReducerState {
    isLoading: boolean
}

export interface PasswordForm {
    password: string,
    password_confirmation: string
}

export interface PasswordFormError {
    password: boolean,
    password_confirmation: boolean
}
