import {NavigateFunction} from "react-router-dom";
import {t} from "i18next";

import Service from "./services/service.ts";
import layoutActions from '../../layouts/Layout/actions.tsx';
import {actions as staticActions} from './reducer.ts';
import {extractValidationMessages} from "../../utils/utils.ts";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";
import authActions from "../../auth/actions.tsx";
import {PasswordForm} from "./types.ts";
import {ROUTES} from "../../constants.ts";

const service = new Service();

const sendPasswordResetLink = (email: string) => (dispatch: any) => {
    dispatch(authActions.setIsLoading(true))

    return service.sendPasswordResetLink(email).then(() => {
        dispatch(layoutActions.showSnackBar({
            message: 'Wysłano link do zresetowania hasła na adres email!',
            autoHideDuration: 5000
        }))
    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: t(extractValidationMessages(error)[0]) ?? error.message,
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.ERROR
        }))
    }).finally(() =>
        dispatch(authActions.setIsLoading(false))
    )
}

const resetPassword = (passwordForm: PasswordForm, email: string, token: string, navigate: NavigateFunction) => (dispatch: any) => {
    dispatch(authActions.setIsLoading(true))

    return service.resetPassword(passwordForm, email, token).then(() => {
        navigate(ROUTES.LOGIN)
        dispatch(layoutActions.showSnackBar({
            message: 'Hasło zostało zmienione!',
            autoHideDuration: 5000
        }))
    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: t(extractValidationMessages(error)[0]) ?? error.message,
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.ERROR
        }))
    }).finally(() =>
        dispatch(authActions.setIsLoading(false))
    )
}

const asyncActions = {
    sendPasswordResetLink,
    resetPassword
}

export default {
    ...asyncActions,
    ...staticActions,
};
