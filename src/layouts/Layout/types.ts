export interface LayoutReducerState {
    isMobileMenuOpen: boolean
    isUserMenuOpen: boolean
    snackBarStack: SmoothSnackbarState[]
}

export interface User {
    id: number
    firstName: string
    lastName: string
    phone: string
    email: string
}

export interface SmoothSnackbarState {
    id: string
    isSnackBarOpen: boolean
    message?: string
    autoHideDuration?: number,
    type?: SmoothSnackbarEnum
    withButton?: boolean,
    buttonText?: string
    onButtonClick?: () => void
}

export enum SmoothSnackbarEnum {
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
    ERROR = 'error'
}
