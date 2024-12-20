import {get} from "lodash";

import {actions as staticActions} from './reducer';
import Service from "./services/service.ts";
import {DEFAULT_USER_DATA} from "./constants.ts";
import {extractValidationMessages} from "../../utils/utils.ts";

const service = new Service();

const checkAuth = () => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))
    return service.checkAuth().then((response) => {
        const userData = get(response, "data", DEFAULT_USER_DATA)
        if (userData.id) {
            dispatch(staticActions.setIsLogged(true))
            dispatch(staticActions.setUserData(userData))
        }
    }).catch(() => {
            dispatch(staticActions.setIsLogged(false))
            dispatch(staticActions.setIsAdmin(false))
            dispatch(staticActions.setUserData(DEFAULT_USER_DATA))
        }
    ).finally(()=> dispatch(staticActions.setIsLoading(false)))
}

const checkAdmin = () => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))
    return service.checkAdmin().then((response) => {
        const isAdmin = get(response, "data.isAdmin", false)

        if (isAdmin) {
            dispatch(staticActions.setIsAdmin(true))
        }
    }).catch(() => {
        dispatch(staticActions.setIsAdmin(false))
    }).finally(()=> dispatch(staticActions.setIsLoading(false)))
}

const logout = () => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))
    return service.logout().then(() => {
        localStorage.removeItem('access_token')
        dispatch(staticActions.setUserData(DEFAULT_USER_DATA))
        dispatch(staticActions.setIsAdmin(false))
        dispatch(staticActions.setIsLogged(false))
        dispatch(staticActions.showSnackBar({
            message: 'Wylogowano!',
            autoHideDuration: 5000
        }))
    }).catch((error) => {
        dispatch(staticActions.showSnackBar({
            message: extractValidationMessages(error)[0] ?? error.message,
            autoHideDuration: 5000
        }))
    }).finally(()=> dispatch(staticActions.setIsLoading(false)))
}

const asyncActions = {
    checkAuth,
    checkAdmin,
    logout
}

export default {
    ...asyncActions,
    ...staticActions,
};
