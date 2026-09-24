import {get} from "lodash";
import {t} from "i18next";

import {actions as staticActions} from "./reducer.ts";
import layoutActions from '../layouts/Layout/actions.tsx';
import {DEFAULT_USER_DATA} from "../layouts/Layout/constants.ts";
import {extractValidationMessages} from "../utils/utils.ts";
import Service from "../layouts/Layout/services/service.ts";
import {SmoothSnackbarEnum} from "../layouts/Layout/types.ts";

const service = new Service();

const checkAuth = () => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.checkAuth().then((response) => {
        const userData = get(response, "data.user", DEFAULT_USER_DATA)
        const isAdmin = get(response, "data.isAdmin", false)

        if (userData.id) {
            dispatch(staticActions.setIsAuthenticated(true))
            dispatch(staticActions.setUserData(userData))
        }
        if (isAdmin) {
            dispatch(staticActions.setIsAdmin(true))
        }
    }).catch(() => {
        dispatch(staticActions.setIsAuthenticated(false))
        dispatch(staticActions.setIsAdmin(false))
        dispatch(staticActions.setUserData(DEFAULT_USER_DATA))
    }).finally(() => dispatch(staticActions.setIsLoading(false)))
}

const resendMail = () => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.resendMail().then(() => {
        dispatch(layoutActions.showSnackBar({
            message: 'Wysłano link weryfikacyjny na adres email!',
            autoHideDuration: 5000
        }))
    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: t(extractValidationMessages(error)[0]) ?? error.message,
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.ERROR
        }))
    }).finally(() => dispatch(staticActions.setIsLoading(false)))
}

const logout = () => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))
    return service.logout().then(() => {
        dispatch(staticActions.setUserData(DEFAULT_USER_DATA))
        dispatch(staticActions.setIsAdmin(false))
        dispatch(staticActions.setIsAuthenticated(false))
        dispatch(staticActions.clearAccessToken())
        dispatch(layoutActions.showSnackBar({
            message: 'Wylogowano!',
            autoHideDuration: 5000
        }))
    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: t(extractValidationMessages(error)[0]) ?? error.message,
            autoHideDuration: 5000
        }))
    }).finally(() => dispatch(staticActions.setIsLoading(false)))
}

const asyncActions = {
    checkAuth,
    logout,
    resendMail
}

export default {
    ...asyncActions,
    ...staticActions,
};
