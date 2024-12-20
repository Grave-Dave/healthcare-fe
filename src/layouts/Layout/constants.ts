import {SmoothSnackbarEnum, User} from "./types.ts";

export const XS = 'XS';
export const SM = 'SM';
export const MD = 'MD';
export const LG = 'LG';
export const XL = 'XL';

export const BREAKPOINTS = {LG, MD, SM, XL, XS} as const;
export const BREAKPOINT_NUMBERS = {
    XS: 540,
    SM: 800,
    MD: 1280,
    LG: 1440,
} as const;

export const DEFAULT_SNACKBAR = {
    isSnackBarOpen: false,
    autoHideDuration: 5000,
    message: '',
    type: SmoothSnackbarEnum.INFO
}

export const DEFAULT_USER_DATA: User = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
}
