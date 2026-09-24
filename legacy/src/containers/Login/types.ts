export interface LoginPageReducerState {
    loginForm: LoginForm
    loginFormError: LoginFormError
    isLoading: boolean
}
export interface LoginForm {
    email: string,
    password: string
}

export interface LoginFormError {
    email: boolean,
    password: boolean
}
