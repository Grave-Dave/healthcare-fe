export interface LayoutReducerState {
    isMobileMenuOpen: boolean
    isUserMenuOpen: boolean
    snackBarState: SmoothSnackbarState
}

export interface User {
    id: number
    firstName: string
    lastName: string
    phone: string
    email: string
}

export interface SmoothSnackbarState {
    isSnackBarOpen: boolean
    message: string
    autoHideDuration?: number,
    type?: SmoothSnackbarEnum
}

export enum SmoothSnackbarEnum {
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
    ERROR = 'error'
}
