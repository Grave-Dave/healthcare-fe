export interface RegisterForm {
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
    password2: string
}

export type ShowPassword = Record<keyof Pick<RegisterForm, 'password' | 'password2'>, boolean>;

