import {NavigateFunction} from "react-router-dom";
import {get} from "lodash";
import {t} from "i18next";

import {actions as staticActions} from './reducer';
import layoutActions from '../../layouts/Layout/actions.tsx';
import authActions from "../../auth/actions.tsx";
import Service from "./services/service.ts";
import {extractValidationMessages} from "../../utils/utils.ts";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";
import {RegisterForm} from "../Register/types.ts";
import {ROUTES} from "../../constants.ts";
import {DEFAULT_USER_DATA} from "../../layouts/Layout/constants.ts";

const service = new Service();

const updateAccount = (userDataForm: RegisterForm, navigate: NavigateFunction) => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.updateUserAccount(userDataForm).then((response) => {
        const userData = get(response, "data.user", DEFAULT_USER_DATA)
        dispatch(authActions.setUserData(userData))
        navigate(ROUTES.HOME)
        dispatch(layoutActions.showSnackBar({
            message: 'Zaktualizowano konto.',
            autoHideDuration: 5000
        }))
    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: t(extractValidationMessages(error)[0]) ?? error.message,
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.ERROR
        }))
    }).finally(() =>
        dispatch(staticActions.setIsLoading(false))
    )
}

const deleteAccount = (navigate: NavigateFunction) => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.deleteUserAccount().then(() => {
        dispatch(authActions.setUserData(DEFAULT_USER_DATA))
        dispatch(authActions.setIsAdmin(false))
        dispatch(authActions.setIsAuthenticated(false))
        dispatch(authActions.clearAccessToken())
        navigate(ROUTES.HOME)
        dispatch(layoutActions.showSnackBar({
            message: 'Usunięto konto.',
            autoHideDuration: 5000
        }))
    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: t(extractValidationMessages(error)[0]) ?? error.message,
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.ERROR
        }))
    }).finally(() =>
        dispatch(staticActions.setIsLoading(false))
    )
}


const asyncActions = {
    updateAccount,
    deleteAccount
}

export default {
    ...asyncActions,
    ...staticActions,
};
